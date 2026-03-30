import type { CheckoutDTO } from "@shared/contracts/checkout";
import type { Order } from "@shared/domain/order";

import type { OrdersQuery, PaginatedOrdersDTO } from "@/entities/order/types";
import { ordersApi } from "@/entities/order/api";

import type { OrderRepository } from "./order.repository";

export class HttpOrderRepository implements OrderRepository {
    checkout(payload: CheckoutDTO): Promise<Order> {
        return ordersApi.checkout(payload);
    }

    getMyOrders(params?: OrdersQuery): Promise<PaginatedOrdersDTO> {
        return ordersApi.getMyOrders(params);
    }
}
