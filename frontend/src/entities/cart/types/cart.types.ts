import type {
    ProductUnit,
    ProductVolumeOption,
    StoreProductPreview,
} from "@/entities/product/types/product.types";
import type { ID, Money, Quantity, Slug, Subtotal } from "@shared/primitives";

export type CartItem = {
    productId: ID;
    variant: {
        value: ProductVolumeOption["value"];
        label: string;
        unit: ProductUnit;
        price: Money;
        oldPrice?: Money;
    };
    price: Money;
    oldPrice?: Money;
    qty: Quantity;
    subtotal: Subtotal;
};

export type CartViewItem = {
    id: ID;
    slug: Slug;
    name: string;
    image: string;
    volumeValue: ProductVolumeOption["value"];
    price: Money;
    oldPrice?: Money;
    qty: Quantity;
};

export type CartViewItemDetailed = {
    item: CartViewItem;
    product: StoreProductPreview;
    volume: ProductVolumeOption;
    unitPrice: Money;
    totalPrice: Subtotal;
};
