import type { CartRow } from "@shared/domain/cart";
import type { CartRepository } from "@/entities/cart/repository";

export async function clearCartUseCase(repository: CartRepository): Promise<readonly CartRow[]> {
    const currentCart = await repository.getCart();

    if (currentCart.length === 0) {
        return currentCart;
    }

    return repository.clearCart();
}
