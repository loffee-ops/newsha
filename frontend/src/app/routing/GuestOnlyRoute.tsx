import { Navigate, Outlet } from "react-router-dom";

import { AppLoader } from "@design-system/ui/AppLoader";

import { useAppSelector } from "@/app/store/hooks";

import { selectIsAuthenticated, selectSessionLoaded, selectUserRole } from "@/features/auth/model";
import { getUserDashboardPath } from "@/features/auth/lib";

export function GuestOnlyRoute() {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const sessionLoaded = useAppSelector(selectSessionLoaded);
    const role = useAppSelector(selectUserRole);

    if (!sessionLoaded) {
        return <AppLoader fullscreen />;
    }

    if (isAuthenticated) {
        return <Navigate to={getUserDashboardPath(role)} replace />;
    }

    return <Outlet />;
}
