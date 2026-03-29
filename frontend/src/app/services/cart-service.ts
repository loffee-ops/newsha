import type { AddToCartDTO, RemoveFromCartDTO } from "@shared/contracts/cart";

import { HttpCartRepository } from "@/entities/cart/repository";

import {
    addToCartUseCase,
    clearCartUseCase,
    loadCartUseCase,
    removeFromCartUseCase,
} from "@/features/cart/use-cases";

export function createCartService() {
    const repository = new HttpCartRepository();

    return {
        fetchCart: () => loadCartUseCase(repository),
        addToCart: (payload: AddToCartDTO) => addToCartUseCase(repository, payload),
        removeFromCart: (payload: RemoveFromCartDTO) => removeFromCartUseCase(repository, payload),
        clearCart: () => clearCartUseCase(repository),
    };
}
