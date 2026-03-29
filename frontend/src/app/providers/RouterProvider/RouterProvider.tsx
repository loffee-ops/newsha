import type { ReactNode } from "react";
import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import { AppLoader } from "@design-system/ui/AppLoader";

type RouterProviderProps = {
    children: ReactNode;
};

export function RouterProvider({ children }: RouterProviderProps) {
    return (
        <BrowserRouter>
            <Suspense fallback={<AppLoader fullscreen />}>{children}</Suspense>
        </BrowserRouter>
    );
}
