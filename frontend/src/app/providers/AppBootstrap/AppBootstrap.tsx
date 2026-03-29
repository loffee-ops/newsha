import type { ReactNode } from "react";
import { useEffect } from "react";

import { initializeApp } from "@/app/store/initialize-app";
import { useAppDispatch, useAppSelector, selectAppStatus, selectIsAppBooting } from "@/app/store";
import { AppLoader } from "@design-system/ui/AppLoader";
import { ErrorFallback } from "@design-system/ui/ErrorFallback";

type AppBootstrapProps = {
    children: ReactNode;
};

export function AppBootstrap({ children }: AppBootstrapProps) {
    const dispatch = useAppDispatch();
    const isBooting = useAppSelector(selectIsAppBooting);
    const status = useAppSelector(selectAppStatus);

    useEffect(() => {
        void dispatch(initializeApp());
    }, [dispatch]);

    if (isBooting) {
        return <AppLoader fullscreen />;
    }

    if (status === "error") {
        return <ErrorFallback />;
    }

    return <>{children}</>;
}
