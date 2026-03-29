import type { CartRow } from "@shared/domain/cart";
import type { AddToCartDTO } from "@shared/contracts/cart";
import type { CartRepository } from "@/entities/cart/repository";

export async function addToCartUseCase(
    repository: CartRepository,
    payload: AddToCartDTO,
): Promise<readonly CartRow[]> {
    if (!payload.productId || !Number.isInteger(payload.qty) || payload.qty <= 0) {
        throw new Error("Invalid add to cart payload");
    }

    return repository.addToCart(payload);
}
