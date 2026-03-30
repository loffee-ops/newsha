import type { Order, OrderStatus } from "@shared/domain/order";
import type { ID } from "@shared/primitives";

import type { AdminOrdersQuery, AdminPaginatedOrdersDTO } from "@/entities/order/types";
import { adminOrdersApi } from "@/entities/order/api";

import type { AdminOrderRepository } from "./admin-order.repository";

export class HttpAdminOrderRepository implements AdminOrderRepository {
    getAll(params?: AdminOrdersQuery): Promise<AdminPaginatedOrdersDTO> {
        return adminOrdersApi.getAll(params);
    }

    getById(id: ID): Promise<Order> {
        return adminOrdersApi.getById(id);
    }

    updateStatus(payload: { id: ID; status: OrderStatus }): Promise<Order> {
        return adminOrdersApi.updateStatus(payload);
    }
}
