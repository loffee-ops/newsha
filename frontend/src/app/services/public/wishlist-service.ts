import type { ID } from "@shared/primitives";

import { HttpWishlistRepository } from "@/entities/wishlist/repository";

export function createWishlistService() {
    const repository = new HttpWishlistRepository();

    return {
        get: () => repository.getWishlist(),
        add: (id: ID) => repository.addToWishlist(id),
        remove: (id: ID) => repository.removeFromWishlist(id),
        toggle: (id: ID) => repository.toggleWishlist(id),
    };
}
