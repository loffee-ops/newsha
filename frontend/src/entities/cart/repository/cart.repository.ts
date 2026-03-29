import type { CartRow } from "@shared/domain/cart";
import type { AddToCartDTO, RemoveFromCartDTO } from "@shared/contracts/cart";

export interface CartRepository {
    getCart(): Promise<readonly CartRow[]>;
    addToCart(payload: AddToCartDTO): Promise<readonly CartRow[]>;
    removeFromCart(payload: RemoveFromCartDTO): Promise<readonly CartRow[]>;
    clearCart(): Promise<readonly CartRow[]>;
}
