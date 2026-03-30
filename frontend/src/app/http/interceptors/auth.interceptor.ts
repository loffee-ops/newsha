import { store } from "@/app/store";

import { UnauthorizedError } from "@/app/http/errors";

import { clearAuth } from "@/features/auth/model";

import { addResponseInterceptor } from "./interceptor-registry";

let teardown: (() => void) | null = null;

export function setupHttpInterceptors(): void {
    if (teardown) {
        return;
    }

    teardown = addResponseInterceptor((res) => {
        if (res.status !== 401) {
            return res;
        }

        store.dispatch(clearAuth());

        throw new UnauthorizedError(res.data);
    });
}
