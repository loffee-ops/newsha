import type { CartRow } from "@shared/domain/cart";
import type { AddToCartDTO, RemoveFromCartDTO } from "@shared/contracts/cart";

export interface CartRepository {
    getCart(): Promise<CartRow[]>;
    addToCart(payload: AddToCartDTO): Promise<CartRow[]>;
    removeFromCart(payload: RemoveFromCartDTO): Promise<CartRow[]>;
    clearCart(): Promise<CartRow[]>;
}
