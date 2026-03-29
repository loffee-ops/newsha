import { Navigate, Outlet } from "react-router-dom";

import type { UserRole } from "@shared/domain/user";

import { useAppSelector } from "@/app/store/hooks";
import { ROUTES } from "@/app/navigation/config";
import { AppLoader } from "@design-system/ui/AppLoader";

import { selectSessionLoaded, selectUserRole } from "@/features/auth/model";

type RoleRouteProps = {
    allowedRoles: readonly UserRole[];
};

export function RoleRoute({ allowedRoles }: RoleRouteProps) {
    const role = useAppSelector(selectUserRole);
    const sessionLoaded = useAppSelector(selectSessionLoaded);

    if (!sessionLoaded) {
        return <AppLoader fullscreen />;
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to={ROUTES.HOME} replace />;
    }

    return <Outlet />;
}
