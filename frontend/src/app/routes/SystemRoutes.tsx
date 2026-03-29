import type { RouteObject } from "react-router-dom";

import { ErrorPage, MaintenancePage, NotFoundPage, ServerErrorPage } from "@/pages";
import { ROUTES } from "@/app/navigation/config";

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
