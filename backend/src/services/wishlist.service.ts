import type { ID, ISODate } from "@shared/primitives";
import { asID } from "@shared/primitives";

import type { Wishlist, WishlistItem } from "@shared/domain/wishlist";

import { WishlistModel, type WishlistDB, type WishlistDBItem } from "@/models/wishlist.model";

function now(): Date {
    return new Date();
}

function createWishlistDbItem(productId: string): WishlistDBItem {
    return {
        productId,
        addedAt: now(),
    };
}

function toWishlistItem(item: WishlistDB["items"][number]): WishlistItem {
    return {
        productId: asID(item.productId),
        addedAt: item.addedAt.toISOString() as ISODate,
    };
}

function toWishlist(doc: WishlistDB): Wishlist {
    return {
        ownerId: asID(doc.userId),
        items: doc.items.map(toWishlistItem),
    };
}

export class WishlistService {
    async getWishlist(userId: ID): Promise<Wishlist> {
        const userIdStr = String(userId);

        const doc = await WishlistModel.findOne({ userId: userIdStr }).lean<WishlistDB | null>();

        if (!doc) {
            return {
                ownerId: asID(userIdStr),
                items: [],
            };
        }

        return toWishlist(doc);
    }

    async add(userId: ID, productId: ID): Promise<Wishlist> {
        const userIdStr = String(userId);
        const productIdStr = String(productId);

        const doc = await WishlistModel.findOne({ userId: userIdStr }).lean<WishlistDB | null>();
        const items: WishlistDBItem[] = doc?.items ?? [];

        const exists = items.some((item) => item.productId === productIdStr);

        const next: WishlistDBItem[] = exists
            ? items
            : [...items, createWishlistDbItem(productIdStr)];

        await WishlistModel.updateOne(
            { userId: userIdStr },
            {
                $set: {
                    userId: userIdStr,
                    items: next,
                },
            },
            { upsert: true },
        );

        return {
            ownerId: asID(userIdStr),
            items: next.map(toWishlistItem),
        };
    }

    async remove(userId: ID, productId: ID): Promise<Wishlist> {
        const userIdStr = String(userId);
        const productIdStr = String(productId);

        const doc = await WishlistModel.findOne({ userId: userIdStr }).lean<WishlistDB | null>();

        if (!doc) {
            return {
                ownerId: asID(userIdStr),
                items: [],
            };
        }

        const next: WishlistDBItem[] = doc.items.filter((item) => item.productId !== productIdStr);

        await WishlistModel.updateOne(
            { userId: userIdStr },
            {
                $set: {
                    userId: userIdStr,
                    items: next,
                },
            },
        );

        return {
            ownerId: asID(userIdStr),
            items: next.map(toWishlistItem),
        };
    }

    async toggle(userId: ID, productId: ID): Promise<Wishlist> {
        const userIdStr = String(userId);
        const productIdStr = String(productId);

        const doc = await WishlistModel.findOne({ userId: userIdStr }).lean<WishlistDB | null>();
        const items: WishlistDBItem[] = doc?.items ?? [];

        const exists = items.some((item) => item.productId === productIdStr);

        const next: WishlistDBItem[] = exists
            ? items.filter((item) => item.productId !== productIdStr)
            : [...items, createWishlistDbItem(productIdStr)];

        await WishlistModel.updateOne(
            { userId: userIdStr },
            {
                $set: {
                    userId: userIdStr,
                    items: next,
                },
            },
            { upsert: true },
        );

        return {
            ownerId: asID(userIdStr),
            items: next.map(toWishlistItem),
        };
    }

    async clear(userId: ID): Promise<void> {
        const userIdStr = String(userId);

        await WishlistModel.updateOne(
            { userId: userIdStr },
            {
                $set: {
                    userId: userIdStr,
                    items: [],
                },
            },
            { upsert: true },
        );
    }

    async merge(userId: ID, guestItems: readonly ID[]): Promise<Wishlist> {
        const userIdStr = String(userId);

        const doc = await WishlistModel.findOne({ userId: userIdStr }).lean<WishlistDB | null>();
        const existing: WishlistDBItem[] = doc?.items ?? [];

        const byProductId = new Map<string, WishlistDBItem>();

        for (const item of existing) {
            byProductId.set(item.productId, item);
        }

        for (const guestId of guestItems) {
            const productIdStr = String(guestId);

            if (!byProductId.has(productIdStr)) {
                byProductId.set(productIdStr, createWishlistDbItem(productIdStr));
            }
        }

        const next: WishlistDBItem[] = [...byProductId.values()];

        await WishlistModel.updateOne(
            { userId: userIdStr },
            {
                $set: {
                    userId: userIdStr,
                    items: next,
                },
            },
            { upsert: true },
        );

        return {
            ownerId: asID(userIdStr),
            items: next.map(toWishlistItem),
        };
    }
}
