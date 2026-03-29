import type { DeliveryMethod, PaymentMethod } from "@shared/domain/order";

export type CheckoutFormValues = {
    firstName: string;
    lastName: string;
    middleName: string;
    phone: string;
    deliveryMethod: DeliveryMethod;
    city: string;
    warehouse: string;
    postomat: string;
    address: string;
    paymentMethod: PaymentMethod;
    comment: string;
};
