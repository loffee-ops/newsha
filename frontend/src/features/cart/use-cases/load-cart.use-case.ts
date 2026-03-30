import type { CartRow } from "@shared/domain/cart";

import type { CartRepository } from "@/entities/cart/repository";

export async function loadCartUseCase(repository: CartRepository): Promise<readonly CartRow[]> {
    return repository.getCart();
}
