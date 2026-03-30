import type { RouteObject } from "react-router-dom";

import { GuestOnlyRoute } from "@/app/routing";
import { ROUTES } from "@/app/navigation/config";

import {
    ForgotPasswordPage,
    LoginPage,
    RegisterPage,
    ResetPasswordPage,
    UnauthorizedPage,
} from "@/pages";

export const authRoutes: RouteObject[] = [
    {
        element: <GuestOnlyRoute />,
        children: [
            {
                path: ROUTES.LOGIN,
                element: <LoginPage />,
            },
            {
                path: ROUTES.REGISTER,
                element: <RegisterPage />,
            },
            {
                path: ROUTES.FORGOT_PASSWORD,
                element: <ForgotPasswordPage />,
            },
            {
                path: ROUTES.RESET_PASSWORD,
                element: <ResetPasswordPage />,
            },
        ],
    },
    {
        path: ROUTES.UNAUTHORIZED,
        element: <UnauthorizedPage />,
    },
];
