import type { PaginatedResponse, PaginationQueryDTO } from "@shared/contracts/pagination";
import type { Order, OrderStatus } from "@shared/domain/order";
import type { ID } from "@shared/primitives";

export type AdminOrdersQuery = Pick<PaginationQueryDTO, "page" | "limit"> & {
    status?: OrderStatus;
};

export type AdminPaginatedOrdersDTO = PaginatedResponse<Order>;

export type UpdateAdminOrderStatusPayload = {
    id: ID;
    status: OrderStatus;
};
