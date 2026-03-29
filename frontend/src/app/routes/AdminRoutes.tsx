import type { RouteObject } from "react-router-dom";

import { AdminRoute } from "@/app/routing";
import { ROUTES } from "@/app/navigation/config";
import {
    AdminAnalyticsPage,
    AdminBannersPage,
    AdminCategoriesPage,
    AdminDashboardPage,
    AdminLayout,
    AdminOrderDetailsPage,
    AdminOrdersPage,
    AdminProductEditPage,
    AdminProductsPage,
    AdminReviewsPage,
    AdminUsersPage,
} from "@/pages";

export const adminRoutes: RouteObject = {
    element: <AdminRoute />,
    children: [
        {
            path: ROUTES.ADMIN,
            element: <AdminLayout />,
            children: [
                { index: true, element: <AdminDashboardPage /> },
                { path: "products", element: <AdminProductsPage /> },
                { path: "products/:productId", element: <AdminProductEditPage /> },
                { path: "categories", element: <AdminCategoriesPage /> },
                { path: "orders", element: <AdminOrdersPage /> },
                { path: "orders/:orderId", element: <AdminOrderDetailsPage /> },
                { path: "users", element: <AdminUsersPage /> },
                { path: "reviews", element: <AdminReviewsPage /> },
                { path: "banners", element: <AdminBannersPage /> },
                { path: "analytics", element: <AdminAnalyticsPage /> },
            ],
        },
    ],
};
