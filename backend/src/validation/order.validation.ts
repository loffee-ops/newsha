import type { Request } from "express";
import { isValidObjectId } from "mongoose";

import { asID } from "@shared/primitives";
import type { ID } from "@shared/primitives";
import type { CheckoutDTO } from "@shared/contracts/checkout";
import {
    DELIVERY_METHOD,
    PAYMENT_METHOD,
    ORDER_STATUS,
    type DeliveryMethod,
    type PaymentMethod,
    type OrderStatus,
} from "@shared/domain/order";

import { CommonErrors, OrderErrors } from "@/errors";

type OrderParams = {
    id: string;
};

const ORDER_STATUS_SET = new Set<OrderStatus>(Object.values(ORDER_STATUS));
const DELIVERY_METHOD_SET = new Set<DeliveryMethod>(Object.values(DELIVERY_METHOD));
const PAYMENT_METHOD_SET = new Set<PaymentMethod>(Object.values(PAYMENT_METHOD));

function isString(value: unknown): value is string {
    return typeof value === "string";
}

function isBoolean(value: unknown): value is boolean {
    return typeof value === "boolean";
}

function isNonEmptyString(value: unknown): value is string {
    return isString(value) && value.trim().length > 0;
}

function requireObject(value: unknown, fieldName: string): Record<string, unknown> {
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
        throw CommonErrors.badRequest(`${fieldName} is required`);
    }

    return value as Record<string, unknown>;
}

function requireTrimmedString(value: unknown, fieldName: string): string {
    if (!isNonEmptyString(value)) {
        throw CommonErrors.badRequest(`${fieldName} is required`);
    }

    return value.trim();
}

function normalizeOptionalString(value: unknown, fieldName: string): string | undefined {
    if (value === undefined || value === null) {
        return undefined;
    }

    if (!isString(value)) {
        throw CommonErrors.badRequest(`${fieldName} must be string`);
    }

    const trimmed = value.trim();

    return trimmed.length > 0 ? trimmed : undefined;
}

function parseOrderStatus(value: unknown): OrderStatus {
    if (!isString(value) || !ORDER_STATUS_SET.has(value as OrderStatus)) {
        throw OrderErrors.invalidOrderStatus();
    }

    return value as OrderStatus;
}

function parseDeliveryMethod(value: unknown): DeliveryMethod {
    if (!isString(value) || !DELIVERY_METHOD_SET.has(value as DeliveryMethod)) {
        throw CommonErrors.badRequest("Invalid delivery.method");
    }

    return value as DeliveryMethod;
}

function parsePaymentMethod(value: unknown): PaymentMethod {
    if (!isString(value) || !PAYMENT_METHOD_SET.has(value as PaymentMethod)) {
        throw CommonErrors.badRequest("Invalid payment.method");
    }

    return value as PaymentMethod;
}

export function validateOrderId(req: Request<OrderParams>): ID {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        throw OrderErrors.invalidOrderId();
    }

    return asID(id);
}

export function validateOrderStatus(value: unknown): OrderStatus {
    return parseOrderStatus(value);
}

function validateRecipient(recipientValue: unknown): CheckoutDTO["recipient"] {
    const recipient = requireObject(recipientValue, "recipient");

    return {
        firstName: requireTrimmedString(recipient.firstName, "recipient.firstName"),
        lastName: requireTrimmedString(recipient.lastName, "recipient.lastName"),
        middleName: normalizeOptionalString(recipient.middleName, "recipient.middleName"),
        phone: requireTrimmedString(recipient.phone, "recipient.phone"),
        email: normalizeOptionalString(recipient.email, "recipient.email")?.toLowerCase(),
    };
}

function validateDelivery(deliveryValue: unknown): CheckoutDTO["delivery"] {
    const delivery = requireObject(deliveryValue, "delivery");

    const method = parseDeliveryMethod(delivery.method);
    const city = requireTrimmedString(delivery.city, "delivery.city");
    const warehouse = normalizeOptionalString(delivery.warehouse, "delivery.warehouse");
    const postomat = normalizeOptionalString(delivery.postomat, "delivery.postomat");
    const address = normalizeOptionalString(delivery.address, "delivery.address");

    if (method === DELIVERY_METHOD.Warehouse && !warehouse) {
        throw CommonErrors.badRequest("delivery.warehouse is required");
    }

    if (method === DELIVERY_METHOD.Postomat && !postomat) {
        throw CommonErrors.badRequest("delivery.postomat is required");
    }

    if (method === DELIVERY_METHOD.Courier && !address) {
        throw CommonErrors.badRequest("delivery.address is required");
    }

    return {
        method,
        city,
        warehouse,
        postomat,
        address,
    };
}

function validatePayment(paymentValue: unknown): CheckoutDTO["payment"] {
    const payment = requireObject(paymentValue, "payment");
    const method = parsePaymentMethod(payment.method);

    return {
        method,
    };
}

export function validateCheckout(req: Request): CheckoutDTO {
    const body = req.body as Partial<CheckoutDTO>;

    return {
        recipient: validateRecipient(body.recipient),
        delivery: validateDelivery(body.delivery),
        payment: validatePayment(body.payment),
        comment: normalizeOptionalString(body.comment, "comment"),
    };
}

export function validateSetOrderStatus(req: Request<OrderParams>): {
    id: ID;
    status: OrderStatus;
} {
    const body = req.body as { status?: unknown };

    return {
        id: validateOrderId(req),
        status: parseOrderStatus(body.status),
    };
}

export function validateAdminOrderFilters(req: Request): {
    status?: OrderStatus;
} {
    const rawStatus = req.query.status;

    if (rawStatus === undefined) {
        return {};
    }

    return {
        status: parseOrderStatus(rawStatus),
    };
}

export function validateSetPaid(req: Request<OrderParams>): {
    id: ID;
    isPaid: boolean;
} {
    const body = req.body as { isPaid?: unknown };

    if (!isBoolean(body.isPaid)) {
        throw CommonErrors.badRequest("isPaid must be boolean");
    }

    return {
        id: validateOrderId(req),
        isPaid: body.isPaid,
    };
}
