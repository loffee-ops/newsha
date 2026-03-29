import type { CheckoutRepository } from "@/entities/checkout/repository/checkout.repository";
import { HttpCheckoutRepository } from "@/entities/checkout/repository/http-checkout.repository";

export function createCheckoutService(): CheckoutRepository {
    return new HttpCheckoutRepository();
}
