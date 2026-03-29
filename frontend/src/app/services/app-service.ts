import type { AuthRepository } from "@/entities/auth/repository";
import type { UserRepository } from "@/entities/user/repository/user.repository";
import type { AdminUserRepository } from "@/entities/user/repository/admin-user.repository";
import type { HealthRepository } from "@/entities/health/repository/health.repository";
import type { CategoriesRepository } from "@/entities/category/repository/categories.repository";
import type { AdminCategoriesRepository } from "@/entities/category/repository/admin-categories.repository";
import type { ProductsRepository } from "@/entities/product/repository/products.repository";
import type { AdminProductsRepository } from "@/entities/product/repository/admin-products.repository";
import type { BannerRepository } from "@/entities/banner/repository/banner.repository";
import type { AdminBannerRepository } from "@/entities/banner/repository/admin-banner.repository";
import type { CheckoutRepository } from "@/entities/checkout/repository/checkout.repository";
import type { OrderRepository } from "@/entities/order/repository/order.repository";
import type { AdminOrderRepository } from "@/entities/order/repository/admin-order.repository";
import type { RecentlyViewedRepository } from "@/entities/recently-viewed/repository/recently-viewed.repository";
import type { ReviewRepository } from "@/entities/review/repository/review.repository";
import type { AdminReviewRepository } from "@/entities/review/repository/admin-review.repository";
import type { SearchRepository } from "@/entities/search/repository/search.repository";
import type { ConsultationRepository } from "@/entities/consultation/repository/consultation.repository";
import type { CooperationRepository } from "@/entities/cooperation/repository/cooperation.repository";
import type { AnalyticsRepository } from "@/entities/analytics/repository";

import {
    createAnalyticsService,
    createAuthService,
    createUserService,
    createHealthService,
    createCategoriesService,
    createProductsService,
    createBannerService,
    createCartService,
    createWishlistService,
    createCheckoutService,
    createOrderService,
    createRecentlyViewedService,
    createReviewService,
    createSearchService,
    createConsultationService,
    createCooperationService,
} from "./public";

import {
    createAdminUserService,
    createAdminCategoriesService,
    createAdminProductsService,
    createAdminBannerService,
    createAdminOrderService,
    createAdminReviewService,
} from "./admin";

export type AppServices = {
    analytics: AnalyticsRepository;
    auth: AuthRepository;
    user: UserRepository;
    adminUser: AdminUserRepository;
    health: HealthRepository;
    categories: CategoriesRepository;
    adminCategories: AdminCategoriesRepository;
    products: ProductsRepository;
    adminProducts: AdminProductsRepository;
    banner: BannerRepository;
    adminBanner: AdminBannerRepository;
    wishlist: ReturnType<typeof createWishlistService>;
    cart: ReturnType<typeof createCartService>;
    checkout: CheckoutRepository;
    order: OrderRepository;
    adminOrder: AdminOrderRepository;
    recentlyViewed: RecentlyViewedRepository;
    review: ReviewRepository;
    adminReview: AdminReviewRepository;
    search: SearchRepository;
    consultation: ConsultationRepository;
    cooperation: CooperationRepository;
};

export function createServices(): AppServices {
    return {
        analytics: createAnalyticsService(),
        auth: createAuthService(),
        user: createUserService(),
        adminUser: createAdminUserService(),
        health: createHealthService(),
        categories: createCategoriesService(),
        adminCategories: createAdminCategoriesService(),
        products: createProductsService(),
        adminProducts: createAdminProductsService(),
        banner: createBannerService(),
        adminBanner: createAdminBannerService(),
        wishlist: createWishlistService(),
        cart: createCartService(),
        checkout: createCheckoutService(),
        order: createOrderService(),
        adminOrder: createAdminOrderService(),
        recentlyViewed: createRecentlyViewedService(),
        review: createReviewService(),
        adminReview: createAdminReviewService(),
        search: createSearchService(),
        consultation: createConsultationService(),
        cooperation: createCooperationService(),
    };
}
