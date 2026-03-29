import type { RouteObject } from "react-router-dom";

import { PrivateRoute } from "@/app/routing";
import { ROUTES } from "@/app/navigation/config";
import {
    AccountDashboardPage,
    AccountLayout,
    AccountAddressesPage,
    ChangePasswordPage,
    OrderDetailsPage,
    OrdersPage,
    ProfilePage,
} from "@/pages";

export const accountRoutes: RouteObject = {
    element: <PrivateRoute />,
    children: [
        {
            path: ROUTES.ACCOUNT,
            element: <AccountLayout />,
            children: [
                { index: true, element: <AccountDashboardPage /> },
                { path: "profile", element: <ProfilePage /> },
                { path: "orders", element: <OrdersPage /> },
                { path: "orders/:orderId", element: <OrderDetailsPage /> },
                { path: "addresses", element: <AccountAddressesPage /> },
                { path: "change-password", element: <ChangePasswordPage /> },
            ],
        },
    ],
};
