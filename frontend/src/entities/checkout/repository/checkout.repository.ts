import type { CheckoutDTO } from "@shared/contracts/checkout";
import type { Order } from "@shared/domain/order";

export interface CheckoutRepository {
    submitCheckout(payload: CheckoutDTO): Promise<Order>;
}
