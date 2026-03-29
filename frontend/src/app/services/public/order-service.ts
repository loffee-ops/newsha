import type { OrderRepository } from "@/entities/order/repository/order.repository";
import { HttpOrderRepository } from "@/entities/order/repository/http-order.repository";

export function createOrderService(): OrderRepository {
    return new HttpOrderRepository();
}
