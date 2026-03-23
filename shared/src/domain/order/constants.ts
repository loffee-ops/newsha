export const ORDER_STATUS = {
    Pending: "pending",
    Paid: "paid",
    Shipped: "shipped",
    Completed: "completed",
    Cancelled: "cancelled",
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export const DELIVERY_METHOD = {
    Warehouse: "warehouse",
    Postomat: "postomat",
    Courier: "courier",
} as const;

export type DeliveryMethod = (typeof DELIVERY_METHOD)[keyof typeof DELIVERY_METHOD];

export const PAYMENT_METHOD = {
    CashOnDelivery: "cash",
    Online: "online",
} as const;

export type PaymentMethod = (typeof PAYMENT_METHOD)[keyof typeof PAYMENT_METHOD];
