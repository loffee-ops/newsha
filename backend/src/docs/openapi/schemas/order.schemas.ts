import { z } from "@shared/contracts/common/zod-extend";

export const RecipientSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    middleName: z.string().optional(),
    phone: z.string(),
    email: z.string().optional(),
});

export const DeliverySchema = z.object({
    method: z.enum(["warehouse", "postomat", "courier"]),
    city: z.string(),
    warehouse: z.string().optional(),
    postomat: z.string().optional(),
    address: z.string().optional(),
});

export const PaymentSchema = z.object({
    method: z.enum(["cash", "online"]),
});

export const CheckoutRequestSchema = z.object({
    recipient: RecipientSchema,
    delivery: DeliverySchema,
    payment: PaymentSchema,
    comment: z.string().optional(),
});

export const OrderItemSchema = z.object({
    productId: z.string(),
    volumeValue: z.union([z.string(), z.number()]).optional(),
    name: z.string(),
    price: z.number(),
    quantity: z.number(),
});

export const OrderSchema = z.object({
    id: z.string(),
    userId: z.string(),
    items: z.array(OrderItemSchema),
    total: z.number(),
    status: z.enum(["pending", "paid", "shipped", "completed", "cancelled"]),
    createdAt: z.string(),
    updatedAt: z.string(),
    delivery: DeliverySchema,
    payment: PaymentSchema,
    comment: z.string().optional(),
});

export const UpdateOrderStatusRequestSchema = z.object({
    status: z.enum(["pending", "paid", "shipped", "completed", "cancelled"]),
});

export const MyOrdersListResponseSchema = z.object({
    items: z.array(OrderSchema),
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    pages: z.number(),
});
