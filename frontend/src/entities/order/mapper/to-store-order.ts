import type { Order, OrderItem } from "@shared/domain/order";

import type { StoreOrder, StoreOrderItem } from "@/entities/order/types/order.store.types";

function toStoreOrderItem(item: OrderItem): StoreOrderItem {
    return {
        productId: item.productId,
        volumeValue: item.volumeValue,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
    };
}

export function toStoreOrder(order: Order): StoreOrder {
    return {
        ...order,
        items: order.items.map(toStoreOrderItem),
    };
}

export function toStoreOrders(orders: readonly Order[]): StoreOrder[] {
    return orders.map(toStoreOrder);
}
