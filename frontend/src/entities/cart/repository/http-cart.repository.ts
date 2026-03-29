import type { CartRow } from "@shared/domain/cart";
import type { AddToCartDTO, RemoveFromCartDTO } from "@shared/contracts/cart";

import { cartApi } from "../api/cart.api";
import type { CartRepository } from "./cart.repository";

export class HttpCartRepository implements CartRepository {
    async getCart(): Promise<readonly CartRow[]> {
        const response = await cartApi.getCart();
        return response.items;
    }

    async addToCart(payload: AddToCartDTO): Promise<readonly CartRow[]> {
        const response = await cartApi.addToCart(payload);
        return response.items;
    }

    async removeFromCart(payload: RemoveFromCartDTO): Promise<readonly CartRow[]> {
        const response = await cartApi.removeFromCart(payload);
        return response.items;
    }

    async clearCart(): Promise<readonly CartRow[]> {
        const response = await cartApi.clearCart();
        return response.items;
    }
}
