import type { ID, Money, Quantity } from "@shared/primitives";
import type { ProductVolume } from "@shared/domain/product";

export type CartRow = {
    productId: ID;
    volume: ProductVolume | null;
    qty: Quantity;
    price: Money;
    oldPrice?: Money;
};

export type CartOwnerId = ID | "guest";
