import type { ReactNode } from "react";
import { useEffect } from "react";

import { AppLoader } from "@design-system/ui/AppLoader";
import { ErrorFallback } from "@design-system/ui/ErrorFallback";

import { initializeApp } from "@/app/store";
import { useAppDispatch, useAppSelector, selectAppStatus, selectIsAppBooting } from "@/app/store";

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
