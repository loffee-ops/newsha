import type { CartRow } from "@shared/domain/cart";
import type { RemoveFromCartDTO } from "@shared/contracts/cart";
import type { CartRepository } from "@/entities/cart/repository";

export async function removeFromCartUseCase(
    repository: CartRepository,
    payload: RemoveFromCartDTO,
): Promise<readonly CartRow[]> {
    if (!payload.productId) {
        throw new Error("Invalid remove from cart payload");
    }

    return repository.removeFromCart(payload);
}
