import { useCallback } from "react";

import type { LoginDTO } from "@shared/contracts/auth";

import { useAppDispatch, useAppSelector } from "@/app/store";

import { login, selectAuthState } from "@/features/auth/model";

import { useRedirectAfterLogin } from "./use-redirect-after-login";

export function useLoginForm() {
    const dispatch = useAppDispatch();
    const { status, error } = useAppSelector(selectAuthState);

    useRedirectAfterLogin();

    const onSubmit = useCallback(
        async (values: LoginDTO) => {
            await dispatch(login(values)).unwrap();
        },
        [dispatch],
    );

    return {
        status,
        error,
        onSubmit,
    };
}
