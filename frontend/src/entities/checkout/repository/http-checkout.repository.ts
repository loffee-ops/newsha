import type { CheckoutDTO } from "@shared/contracts/checkout";
import type { Order } from "@shared/domain/order";

import { checkoutApi } from "../api/checkout.api";
import type { CheckoutRepository } from "./checkout.repository";

export class HttpCheckoutRepository implements CheckoutRepository {
    submitCheckout(payload: CheckoutDTO): Promise<Order> {
        return checkoutApi.submitCheckout(payload);
    }
}
