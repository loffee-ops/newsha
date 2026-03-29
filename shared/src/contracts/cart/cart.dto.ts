import type { CartRow } from "@shared/domain/cart";
import type { ProductVolume } from "@shared/domain/product";
import type { ID, Quantity } from "@shared/primitives";

export interface AddToCartDTO {
    productId: ID;
    categoryId?: ID;
    volume: ProductVolume | null;
    qty: Quantity;
}

export interface RemoveFromCartDTO {
    productId: ID;
    volume: ProductVolume | null;
}

export interface CartResponseDTO {
    items: CartRow[];
}
