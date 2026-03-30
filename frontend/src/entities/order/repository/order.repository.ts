import type { CheckoutDTO } from "@shared/contracts/checkout";
import type { Order } from "@shared/domain/order";

import type { OrdersQuery, PaginatedOrdersDTO } from "@/entities/order/types";

export interface OrderRepository {
    checkout(payload: CheckoutDTO): Promise<Order>;
    getMyOrders(params?: OrdersQuery): Promise<PaginatedOrdersDTO>;
}
