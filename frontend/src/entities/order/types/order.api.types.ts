import type { CheckoutDTO } from "@shared/contracts/checkout";
import type { PaginatedResponse, PaginationQueryDTO } from "@shared/contracts/pagination";
import type { Order } from "@shared/domain/order";

export type OrdersQuery = Pick<PaginationQueryDTO, "page" | "limit">;
export type PaginatedOrdersDTO = PaginatedResponse<Order>;
export type CheckoutPayload = CheckoutDTO;
