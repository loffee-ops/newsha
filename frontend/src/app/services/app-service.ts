import type { AuthRepository } from "@/entities/auth/repository";
import { HttpAuthRepository } from "@/entities/auth/repository";

import { createCartService } from "./cart-service";
import { createWishlistService } from "./wishlist-service";

export type AppServices = {
    auth: AuthRepository;
    wishlist: ReturnType<typeof createWishlistService>;
    cart: ReturnType<typeof createCartService>;
};

export function createServices(): AppServices {
    return {
        auth: new HttpAuthRepository(),
        wishlist: createWishlistService(),
        cart: createCartService(),
    };
}
