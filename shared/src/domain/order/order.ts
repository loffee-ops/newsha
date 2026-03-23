import type { ID, ISODate, Subtotal } from "@shared/primitives";

import type { OrderStatus, PaymentMethod } from "./constants";
import type { DeliveryInfo } from "./delivery";
import type { OrderItem } from "./item";

export type OrderPayment = {
    method: PaymentMethod;
};

export type Order = {
    readonly id: ID;
    readonly userId: ID | "guest";
    readonly items: readonly OrderItem[];
    readonly total: Subtotal;
    readonly status: OrderStatus;
    readonly createdAt: ISODate;
    readonly updatedAt: ISODate;
    readonly delivery: DeliveryInfo;
    readonly payment: OrderPayment;
    readonly comment?: string;
};
