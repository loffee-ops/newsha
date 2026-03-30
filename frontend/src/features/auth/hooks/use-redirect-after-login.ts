import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { USER_ROLES } from "@shared/domain/user";

import { useAppDispatch, useAppSelector } from "@/app/store";
import { ROUTES } from "@/app/navigation/config";

import { closeAuthModal, selectIsAuthenticated, selectUserRole } from "@/features/auth/model";

type RedirectLocationState = {
    from?: {
        pathname?: string;
    };
};

export function useRedirectAfterLogin() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const role = useAppSelector(selectUserRole);

    const fromPathname = (location.state as RedirectLocationState | null)?.from?.pathname;

    useEffect(() => {
        if (!isAuthenticated) return;

        dispatch(closeAuthModal());

        if (fromPathname) {
            navigate(fromPathname, { replace: true });
            return;
        }

        navigate(role === USER_ROLES.ADMIN ? ROUTES.ADMIN : ROUTES.ACCOUNT, {
            replace: true,
        });
    }, [dispatch, fromPathname, isAuthenticated, navigate, role]);
}
