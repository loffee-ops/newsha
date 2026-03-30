import * as Yup from "yup";

import type { RegisterDTO } from "@shared/contracts/auth";

import type { FormSchema } from "@/shared/lib/forms";

import { REGISTER_FORM_TEXT as TEXT, REGISTER_VALIDATION_TEXT as T } from "@/features/auth/config";

export type RegisterFormValues = RegisterDTO & {
    confirmPassword: string;
};

const validationSchema: Yup.ObjectSchema<RegisterFormValues> = Yup.object({
    name: Yup.string().trim().min(2, T.NAME_MIN).required(T.REQUIRED),

    phone: Yup.string().trim().required(T.REQUIRED),

    email: Yup.string().trim().email(T.EMAIL_INVALID).required(T.REQUIRED),

    password: Yup.string().min(6, T.PASSWORD_MIN).required(T.REQUIRED),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], T.PASSWORDS_NOT_MATCH)
        .required(T.CONFIRM_REQUIRED),
}).required();

export const registerForm: FormSchema<RegisterFormValues> = {
    title: TEXT.TITLE,
    submitLabel: TEXT.SUBMIT,
    method: "POST",

    initialValues: {
        name: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
    },

    validationSchema,

    fields: [
        {
            name: "name",
            label: TEXT.NAME_LABEL,
            type: "text",
            placeholder: TEXT.NAME_PLACEHOLDER,
        },
        {
            name: "phone",
            label: TEXT.PHONE_LABEL,
            type: "phone",
            placeholder: TEXT.PHONE_PLACEHOLDER,
        },
        {
            name: "email",
            label: TEXT.EMAIL_LABEL,
            type: "email",
            placeholder: TEXT.EMAIL_PLACEHOLDER,
        },
        {
            name: "password",
            label: TEXT.PASSWORD_LABEL,
            type: "password",
            placeholder: TEXT.PASSWORD_PLACEHOLDER,
        },
        {
            name: "confirmPassword",
            label: TEXT.PASSWORD2_LABEL,
            type: "password",
            placeholder: TEXT.PASSWORD2_PLACEHOLDER,
        },
    ],
};
