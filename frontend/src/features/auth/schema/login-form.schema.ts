import * as Yup from "yup";

import type { LoginDTO } from "@shared/contracts/auth";

import type { FormSchema } from "@/shared/lib/forms";
import { LOGIN_FORM_TEXT as TEXT, LOGIN_VALIDATION_TEXT as T } from "@/features/auth/config";

export type LoginFormValues = LoginDTO;

const validationSchema: Yup.ObjectSchema<LoginFormValues> = Yup.object({
    email: Yup.string().trim().email(T.EMAIL_INVALID).required(T.REQUIRED),

    password: Yup.string().min(6, T.PASSWORD_MIN).required(T.REQUIRED),
}).required();

export const loginForm: FormSchema<LoginFormValues> = {
    title: TEXT.TITLE,
    submitLabel: TEXT.SUBMIT,
    method: "POST",

    initialValues: {
        email: "",
        password: "",
    },

    validationSchema,

    fields: [
        {
            name: "email",
            type: "email",
            label: TEXT.EMAIL_LABEL,
            placeholder: TEXT.EMAIL_PLACEHOLDER,
        },
        {
            name: "password",
            type: "password",
            label: TEXT.PASSWORD_LABEL,
        },
    ],
};
