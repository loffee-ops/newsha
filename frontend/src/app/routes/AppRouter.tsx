import { useRoutes } from "react-router-dom";

import { NotFoundPage } from "@/pages";

import { accountRoutes } from "./AccountRoutes";
import { adminRoutes } from "./AdminRoutes";
import { authRoutes } from "./AuthRoutes";
import { checkoutRoutes } from "./CheckoutRoutes";
import { legalRoutes } from "./LegalRoutes";
import { publicRoutes } from "./PublicRoutes";
import { systemRoutes } from "./SystemRoutes";

export function AppRouter() {
    const element = useRoutes([
        accountRoutes,
        adminRoutes,
        ...authRoutes,
        checkoutRoutes,
        legalRoutes,
        publicRoutes,
        ...systemRoutes,
        {
            path: "*",
            element: <NotFoundPage />,
        },
    ]);

    return element;
}
