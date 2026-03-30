import type { CheckoutFormValues } from "@/entities/checkout/types";

import type { FormSchema } from "@/shared/lib/forms";

import { CHECKOUT_FORM_TEXT as M } from "./checkout-form.text";

export const checkoutForm: FormSchema<CheckoutFormValues> = {
    title: M.TITLE,
    submitLabel: M.SUBMIT_LABEL,

    initialValues: {
        firstName: "",
        lastName: "",
        middleName: "",
        phone: "",
        deliveryMethod: "warehouse",
        city: "",
        warehouse: "",
        postomat: "",
        address: "",
        paymentMethod: "cash",
        comment: "",
    },

    fields: [
        { name: "firstName", label: M.FIELDS.FIRST_NAME, type: "text", required: true },
        { name: "lastName", label: M.FIELDS.LAST_NAME, type: "text", required: true },
        { name: "middleName", label: M.FIELDS.MIDDLE_NAME, type: "text" },

        {
            name: "phone",
            label: M.FIELDS.PHONE.LABEL,
            type: "phone",
            required: true,
            placeholder: M.FIELDS.PHONE.PLACEHOLDER,
            pattern: {
                value: /^\+380\d{9}$/,
                message: M.FIELDS.PHONE.ERROR,
            },
        },

        {
            name: "deliveryMethod",
            label: M.FIELDS.DELIVERY_METHOD.LABEL,
            type: "select",
            required: true,
            options: [
                { value: "warehouse", label: M.FIELDS.DELIVERY_METHOD.OPTIONS.WAREHOUSE },
                { value: "postomat", label: M.FIELDS.DELIVERY_METHOD.OPTIONS.POSTOMAT },
                { value: "courier", label: M.FIELDS.DELIVERY_METHOD.OPTIONS.COURIER },
            ],
        },

        {
            name: "city",
            label: M.FIELDS.CITY.LABEL,
            type: "text",
            required: true,
            placeholder: M.FIELDS.CITY.PLACEHOLDER,
        },

        {
            name: "warehouse",
            label: M.FIELDS.WAREHOUSE.LABEL,
            type: "text",
            placeholder: M.FIELDS.WAREHOUSE.PLACEHOLDER,
            visibleWhen: { field: "deliveryMethod", equals: "warehouse" },
            requiredWhen: { field: "deliveryMethod", equals: "warehouse" },
        },

        {
            name: "postomat",
            label: M.FIELDS.POSTOMAT.LABEL,
            type: "text",
            placeholder: M.FIELDS.POSTOMAT.PLACEHOLDER,
            visibleWhen: { field: "deliveryMethod", equals: "postomat" },
            requiredWhen: { field: "deliveryMethod", equals: "postomat" },
        },

        {
            name: "address",
            label: M.FIELDS.ADDRESS.LABEL,
            type: "text",
            placeholder: M.FIELDS.ADDRESS.PLACEHOLDER,
            visibleWhen: { field: "deliveryMethod", equals: "courier" },
            requiredWhen: { field: "deliveryMethod", equals: "courier" },
        },

        {
            name: "comment",
            label: M.FIELDS.COMMENT.LABEL,
            type: "textarea",
            placeholder: "За потреби залиште коментар",
            maxLength: 500,
        },
    ],
};
