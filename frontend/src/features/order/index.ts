export type { OrderState, PaginatedOrders } from "./order.state";
export type { AdminOrderState } from "./admin-order.state";

export { fetchMyOrders } from "./order.thunks";

export {
    fetchAdminOrders,
    fetchAdminOrderById,
    updateAdminOrderStatus,
} from "./admin-order.thunks";

export { clearCurrentOrder, orderReducer } from "./order.slice";

export {
    clearAdminOrderSelected,
    resetAdminOrderUpdateState,
    adminOrderReducer,
} from "./admin-order.slice";

export {
    selectOrderState,
    selectCurrentOrder,
    selectOrdersList,
    selectOrdersMeta,
    selectOrdersStatus,
    selectOrdersError,
    selectIsOrdersLoading,
    selectHasOrders,
    selectOrdersPage,
    selectOrdersLimit,
    selectOrdersTotal,
    selectOrdersTotalPages,
    selectOrdersHasNext,
    selectOrdersHasPrev,
} from "./order.selectors";

export {
    selectAdminOrderState,
    selectAdminOrders,
    selectAdminOrderSelected,
    selectAdminOrdersStatus,
    selectAdminOrdersError,
    selectAdminOrdersPage,
    selectAdminOrdersLimit,
    selectAdminOrdersTotal,
    selectAdminOrdersTotalPages,
    selectAdminOrdersHasNext,
    selectAdminOrdersHasPrev,
    selectAdminOrderUpdateStatus,
    selectAdminOrderUpdateError,
    selectIsAdminOrdersLoading,
    selectIsAdminOrderUpdating,
    selectHasAdminOrders,
} from "./admin-order.selectors";
