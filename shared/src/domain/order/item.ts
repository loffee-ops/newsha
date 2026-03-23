import type { ID, Money, Quantity, Subtotal } from "@shared/primitives";
import type { ProductVolume } from "@shared/domain/product";

export type OrderItem = {
    readonly productId: ID;
    readonly volumeValue?: ProductVolume;
    readonly name: string;
    readonly price: Money;
    readonly quantity: Quantity;
};

export type OrderItemWithTotal = OrderItem & {
    readonly total: Subtotal;
};
