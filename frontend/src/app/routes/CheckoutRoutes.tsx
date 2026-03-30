import type { RouteObject } from "react-router-dom";

import { AppLayout } from "@/app/layout/AppLayout";

import { CheckoutPage, CheckoutSuccessPage } from "@/pages";

export const checkoutRoutes: RouteObject = {
    path: "/",
    element: <AppLayout />,
    children: [
        { path: "checkout", element: <CheckoutPage /> },
        { path: "checkout/success", element: <CheckoutSuccessPage /> },
    ],
};
