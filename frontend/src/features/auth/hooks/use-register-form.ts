import { useCallback } from "react";
import type { FormikHelpers } from "formik";

import { useAppDispatch, useAppSelector } from "@/app/store";

import { register, selectAuthState } from "@/features/auth/model";
import type { RegisterFormValues } from "@/features/auth/schema";

import { useRedirectAfterLogin } from "./use-redirect-after-login";

export function useRegisterForm() {
    const dispatch = useAppDispatch();
    const { status, error } = useAppSelector(selectAuthState);

    useRedirectAfterLogin();

    const onSubmit = useCallback(
        async (values: RegisterFormValues, helpers: FormikHelpers<RegisterFormValues>) => {
            try {
                await dispatch(
                    register({
                        name: values.name,
                        phone: values.phone,
                        email: values.email,
                        password: values.password,
                    }),
                ).unwrap();
            } finally {
                helpers.setSubmitting(false);
            }
        },
        [dispatch],
    );

    return {
        status,
        error,
        onSubmit,
    };
}
