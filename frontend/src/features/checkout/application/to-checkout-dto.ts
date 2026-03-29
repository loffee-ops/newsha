import type { CheckoutDTO } from "@shared/contracts/checkout";
import { DELIVERY_METHOD } from "@shared/domain/order";

import type { CheckoutFormValues } from "@/entities/checkout/types";

export function toCheckoutDTO(values: CheckoutFormValues): CheckoutDTO {
    const recipient: CheckoutDTO["recipient"] = {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        ...(values.middleName ? { middleName: values.middleName } : {}),
    };

    const baseDelivery = {
        method: values.deliveryMethod,
        city: values.city,
    } as const;

    let delivery: CheckoutDTO["delivery"];

    switch (values.deliveryMethod) {
        case DELIVERY_METHOD.Warehouse:
            delivery = {
                ...baseDelivery,
                ...(values.warehouse ? { warehouse: values.warehouse } : {}),
            };
            break;

        case DELIVERY_METHOD.Postomat:
            delivery = {
                ...baseDelivery,
                ...(values.postomat ? { postomat: values.postomat } : {}),
            };
            break;

        case DELIVERY_METHOD.Courier:
            delivery = {
                ...baseDelivery,
                ...(values.address ? { address: values.address } : {}),
            };
            break;
    }

    return {
        recipient,
        delivery,
        payment: {
            method: values.paymentMethod,
        },
        ...(values.comment ? { comment: values.comment } : {}),
    };
}
