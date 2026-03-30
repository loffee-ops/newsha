import type { RouteObject } from "react-router-dom";

import { AppLayout } from "@/app/layout/AppLayout";

import {
    AboutPage,
    CartPage,
    CatalogPage,
    ConsultationPage,
    ContactsPage,
    CooperationPage,
    DeliveryPaymentPage,
    FAQPage,
    HomePage,
    OrderTrackingPage,
    PrivacyPolicyPage,
    ProductPage,
    PublicOfferPage,
    ReturnExchangePage,
    SearchPage,
    WishlistPage,
} from "@/pages";

export const publicRoutes: RouteObject = {
    path: "/",
    element: <AppLayout />,
    children: [
        { index: true, element: <HomePage /> },
        { path: "catalog", element: <CatalogPage /> },
        { path: "catalog/:slug", element: <CatalogPage /> },
        { path: "products/:slug", element: <ProductPage /> },
        { path: "search", element: <SearchPage /> },
        { path: "cart", element: <CartPage /> },
        { path: "wishlist", element: <WishlistPage /> },
        { path: "order-tracking", element: <OrderTrackingPage /> },
        { path: "about", element: <AboutPage /> },
        { path: "contacts", element: <ContactsPage /> },
        { path: "consultation", element: <ConsultationPage /> },
        { path: "cooperation", element: <CooperationPage /> },
        { path: "delivery-payment", element: <DeliveryPaymentPage /> },
        { path: "faq", element: <FAQPage /> },
        { path: "return-exchange", element: <ReturnExchangePage /> },
        { path: "public-offer", element: <PublicOfferPage /> },
        { path: "privacy-policy", element: <PrivacyPolicyPage /> },
    ],
};
