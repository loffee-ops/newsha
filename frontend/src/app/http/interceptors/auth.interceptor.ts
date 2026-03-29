import { store } from "@/app/store/store";
import { UnauthorizedError } from "@/app/http/errors";
import { addResponseInterceptor } from "./interceptor-registry";
import { clearAuth } from "@/features/auth/model";

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
