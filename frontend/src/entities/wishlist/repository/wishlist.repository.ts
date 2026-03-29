import type { ID } from "@shared/primitives";

export interface WishlistRepository {
    getWishlist(): Promise<readonly ID[]>;
    addToWishlist(productId: ID): Promise<readonly ID[]>;
    removeFromWishlist(productId: ID): Promise<readonly ID[]>;
    toggleWishlist(productId: ID): Promise<readonly ID[]>;
}
