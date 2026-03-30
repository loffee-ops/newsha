import type { RouteObject } from "react-router-dom";

import { ROUTES } from "@/app/navigation/config";

import { ErrorPage, MaintenancePage, NotFoundPage, ServerErrorPage } from "@/pages";

export const systemRoutes: RouteObject[] = [
    {
        path: ROUTES.ERROR,
        element: <ErrorPage />,
    },
    {
        path: ROUTES.SERVER_ERROR,
        element: <ServerErrorPage />,
    },
    {
        path: ROUTES.MAINTENANCE,
        element: <MaintenancePage />,
    },
    {
        path: ROUTES.NOT_FOUND,
        element: <NotFoundPage />,
    },
];
