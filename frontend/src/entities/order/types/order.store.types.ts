import type { Order, OrderItem } from "@shared/domain/order";

export type StoreOrderItem = {
    productId: OrderItem["productId"];
    volumeValue: OrderItem["volumeValue"];
    name: OrderItem["name"];
    price: OrderItem["price"];
    quantity: OrderItem["quantity"];
};

export type StoreOrder = Omit<Order, "items"> & {
    items: StoreOrderItem[];
};
