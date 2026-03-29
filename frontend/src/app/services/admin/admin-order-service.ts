import type { AdminOrderRepository } from "@/entities/order/repository/admin-order.repository";
import { HttpAdminOrderRepository } from "@/entities/order/repository/http-admin-order.repository";

export function createAdminOrderService(): AdminOrderRepository {
    return new HttpAdminOrderRepository();
}
