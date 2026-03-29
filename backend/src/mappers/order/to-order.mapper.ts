import { asID, asISODate, asMoney, asQuantity, asSubtotal } from "@shared/primitives";
import {
    DELIVERY_METHOD,
    type DeliveryInfo,
    type Order,
    type OrderItem,
    type OrderStatus,
} from "@shared/domain/order";
import type { ProductVolume } from "@shared/domain/product";

import type { OrderDB } from "@/models/order.model";

function toOrderItem(item: OrderDB["items"][number]): OrderItem {
    return {
        productId: asID(item.productId.toString()),
        volumeValue: item.volumeValue == null ? undefined : (item.volumeValue as ProductVolume),
        name: item.name,
        price: asMoney(item.price),
        quantity: asQuantity(item.quantity),
    };
}

function toDeliveryInfo(delivery: OrderDB["delivery"]): DeliveryInfo {
    const base = {
        firstName: delivery.firstName,
        lastName: delivery.lastName,
        middleName: delivery.middleName ?? undefined,
        phone: delivery.phone,
    };

    switch (delivery.method) {
        case DELIVERY_METHOD.Warehouse:
            return {
                ...base,
                method: DELIVERY_METHOD.Warehouse,
                city: delivery.city,
                warehouse: delivery.warehouse ?? "",
            };

        case DELIVERY_METHOD.Postomat:
            return {
                ...base,
                method: DELIVERY_METHOD.Postomat,
                city: delivery.city,
                postomat: delivery.postomat ?? "",
                address: delivery.address ?? undefined,
            };

        case DELIVERY_METHOD.Courier:
            return {
                ...base,
                method: DELIVERY_METHOD.Courier,
                city: delivery.city,
                address: delivery.address ?? "",
            };

        default:
            throw new Error("Unsupported delivery method");
    }
}

export function toOrder(doc: OrderDB): Order {
    return {
        id: asID(doc._id.toString()),
        userId: doc.userId === "guest" ? "guest" : asID(doc.userId.toString()),
        items: doc.items.map(toOrderItem),
        total: asSubtotal(doc.total),
        status: doc.status as OrderStatus,
        createdAt: asISODate(doc.createdAt.toISOString()),
        updatedAt: asISODate(doc.updatedAt.toISOString()),
        delivery: toDeliveryInfo(doc.delivery),
        payment: {
            method: doc.payment.method,
        },
        comment: doc.comment ?? undefined,
    };
}

export function toOrders(docs: readonly OrderDB[]): readonly Order[] {
    return docs.map(toOrder);
}
