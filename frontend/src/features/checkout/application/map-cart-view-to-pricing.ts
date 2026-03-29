import type { CartViewItemDetailed } from "@/entities/cart/types";
import type { PricingOrderItem } from "@shared/domain/order";

export function mapCartViewToPricing(cart: readonly CartViewItemDetailed[]): PricingOrderItem[] {
    return cart.map((item) => ({
        price: item.item.price,
        quantity: item.item.qty,
        productId: item.item.id,
        categoryId: item.product.categoryId,
    }));
}
