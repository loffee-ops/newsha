import type { PaymentMethod, DeliveryMethod } from "@shared/domain/order";

export type CheckoutDTO = {
    recipient: {
        firstName: string;
        lastName: string;
        middleName?: string;
        phone: string;
        email?: string;
    };
    delivery: {
        method: DeliveryMethod;
        city: string;
        warehouse?: string;
        postomat?: string;
        address?: string;
    };
    payment: {
        method: PaymentMethod;
    };
    comment?: string;
};
