import type { ID } from "@shared/primitives";

import { wishlistApi } from "@/entities/wishlist/api";

import type { WishlistRepository } from "./wishlist.repository";

export class HttpWishlistRepository implements WishlistRepository {
    async getWishlist(): Promise<readonly ID[]> {
        const response = await wishlistApi.getWishlist();
        return response.items;
    }

    async addToWishlist(productId: ID): Promise<readonly ID[]> {
        const response = await wishlistApi.addToWishlist(productId);
        return response.items;
    }

    async removeFromWishlist(productId: ID): Promise<readonly ID[]> {
        const response = await wishlistApi.removeFromWishlist(productId);
        return response.items;
    }

    async toggleWishlist(productId: ID): Promise<readonly ID[]> {
        const response = await wishlistApi.toggleWishlist(productId);
        return response.items;
    }
}
