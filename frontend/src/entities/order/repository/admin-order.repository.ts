import type { Order, OrderStatus } from "@shared/domain/order";
import type { ID } from "@shared/primitives";

import type { AdminOrdersQuery, AdminPaginatedOrdersDTO } from "@/entities/order/types";

export interface AdminOrderRepository {
    getAll(params?: AdminOrdersQuery): Promise<AdminPaginatedOrdersDTO>;
    getById(id: ID): Promise<Order>;
    updateStatus(payload: { id: ID; status: OrderStatus }): Promise<Order>;
}
