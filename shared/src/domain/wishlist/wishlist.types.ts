import type { ID, ISODate } from "@shared/primitives";

export type WishlistOwnerId = ID;

export type WishlistItem = {
    readonly productId: ID;
    readonly addedAt: ISODate;
};

export type Wishlist = {
    readonly ownerId: WishlistOwnerId;
    readonly items: readonly WishlistItem[];
};
