import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAppSelector } from "@/app/store/hooks";
import { ROUTES } from "@/app/navigation/config";
import { AppLoader } from "@design-system/ui/AppLoader";

import { selectIsAuthenticated, selectSessionLoaded } from "@/features/auth/model";

export function PrivateRoute() {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const sessionLoaded = useAppSelector(selectSessionLoaded);
    const location = useLocation();

    if (!sessionLoaded) {
        return <AppLoader fullscreen />;
    }

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.HOME} replace state={{ from: location }} />;
    }

    return <Outlet />;
}
