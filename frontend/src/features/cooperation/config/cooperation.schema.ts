import type { CooperationLeadDTO } from "@shared/contracts/cooperation";

import type { FormSchema } from "@/shared/lib/forms";

import { COOPERATION_TEXT } from "./cooperation.text";

export const cooperationSchema: FormSchema<CooperationLeadDTO> = {
    submitLabel: COOPERATION_TEXT.SUBMIT_LABEL,
    validateBeforeSubmit: true,

    initialValues: {
        name: "",
        phone: "",
        city: "",
        message: "",
    },

    fields: [
        {
            name: "name",
            type: "text",
            placeholder: COOPERATION_TEXT.FIELDS.NAME.PLACEHOLDER,
            required: true,
            minLength: 2,
        },
        {
            name: "phone",
            type: "phone",
            placeholder: COOPERATION_TEXT.FIELDS.PHONE.PLACEHOLDER,
            required: true,
            pattern: {
                value: /^\+?[0-9]{9,14}$/,
                message: COOPERATION_TEXT.FIELDS.PHONE.INVALID_MESSAGE,
            },
        },
        {
            name: "city",
            type: "text",
            placeholder: COOPERATION_TEXT.FIELDS.CITY.PLACEHOLDER,
            required: true,
        },
        {
            name: "message",
            type: "textarea",
            placeholder: COOPERATION_TEXT.FIELDS.MESSAGE.PLACEHOLDER,
            required: true,
            minLength: 5,
        },
    ],
};
