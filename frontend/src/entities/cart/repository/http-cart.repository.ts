import type { CartRow } from "@shared/domain/cart";
import type { AddToCartDTO, RemoveFromCartDTO } from "@shared/contracts/cart";

import { cartApi } from "@/entities/cart/api";
import { mapApiCartToStore } from "@/entities/cart/mappers";

import type { CartRepository } from "./cart.repository";

export class HttpCartRepository implements CartRepository {
    async getCart(): Promise<CartRow[]> {
        const response = await cartApi.getCart();
        return mapApiCartToStore(response.items);
    }

    async addToCart(payload: AddToCartDTO): Promise<CartRow[]> {
        const response = await cartApi.addToCart(payload);
        return mapApiCartToStore(response.items);
    }

    async removeFromCart(payload: RemoveFromCartDTO): Promise<CartRow[]> {
        const response = await cartApi.removeFromCart(payload);
        return mapApiCartToStore(response.items);
    }

    async clearCart(): Promise<CartRow[]> {
        const response = await cartApi.clearCart();
        return mapApiCartToStore(response.items);
    }
}
