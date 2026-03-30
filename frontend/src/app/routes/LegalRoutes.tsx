import type { RouteObject } from "react-router-dom";

import { AppLayout } from "@/app/layout/AppLayout";

import { PrivacyPolicyPage, PublicOfferPage } from "@/pages";

export const legalRoutes: RouteObject = {
    path: "/",
    element: <AppLayout />,
    children: [
        {
            path: "privacy-policy",
            element: <PrivacyPolicyPage />,
        },
        {
            path: "public-offer",
            element: <PublicOfferPage />,
        },
    ],
};
