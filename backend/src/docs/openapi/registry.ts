import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";

import { ProductDTOSchema, ProductPreviewDTOSchema } from "./schemas/product.schemas";

import { UpdateReviewStatusRequestSchema } from "./schemas/review.schemas";
import {
    AdminReviewsListResponseSchema,
    AdminBannerSchema,
    AdminBannerListResponseSchema,
    AdminCategoryListResponseSchema,
    AdminCategorySchema,
    AdminOrdersListResponseSchema,
    AdminProductsListResponseSchema,
    AdminUserSchema,
    AdminUsersListResponseSchema,
} from "./schemas/admin.schemas";

import {
    ProductFiltersSchema,
    SetProductActiveRequestSchema,
    SetProductFlagsRequestSchema,
    ProductMutationRequestSchema,
} from "./schemas/product.schemas";

import { HealthResponseSchema } from "./schemas/health.schemas";
import {
    CategorySchema,
    CreateCategoryRequestSchema,
    SetCategoryActiveRequestSchema,
    UpdateCategoryRequestSchema,
} from "./schemas/category.schemas";
import { BannerSchema } from "./schemas/banner.schemas";
import { SearchResponseSchema } from "./schemas/search.schemas";
import { ReviewSchema, CreateReviewRequestSchema } from "./schemas/review.schemas";
import {
    AuthSessionSchema,
    AuthSessionsResponseSchema,
    UpdateUserRoleRequestSchema,
} from "./schemas/auth.schemas";
import { LoginRequestSchema, RegisterRequestSchema } from "./schemas/auth.schemas";
import {
    UserResponseSchema,
    OkResponseSchema,
    ErrorResponseSchema,
} from "./schemas/responses.schemas";
import {
    CartResponseSchema,
    CartRowSchema,
    AddToCartRequestSchema,
    RemoveFromCartRequestSchema,
} from "./schemas/cart.schemas";
import { WishlistResponseSchema, WishlistMutationRequestSchema } from "./schemas/wishlist.schemas";
import {
    RecipientSchema,
    DeliverySchema,
    PaymentSchema,
    CheckoutRequestSchema,
    OrderItemSchema,
    OrderSchema,
    UpdateOrderStatusRequestSchema,
    MyOrdersListResponseSchema,
} from "./schemas/order.schemas";
import {
    CheckoutItemSchema,
    AnalyticsEventSchema,
    AnalyticsStatsSchema,
} from "./schemas/analytics.schemas";
import { RecentlyViewedResponseSchema } from "./schemas/recently-viewed.schemas";
import {
    ConsultationSchema,
    CreateConsultationRequestSchema,
    UpdateConsultationStatusRequestSchema,
} from "./schemas/consultation.schemas";
import {
    CooperationSchema,
    CreateCooperationRequestSchema,
    UpdateCooperationStatusRequestSchema,
} from "./schemas/cooperation.schemas";

export const registry = new OpenAPIRegistry();

registry.register("Product", ProductDTOSchema);
registry.register("ProductPreview", ProductPreviewDTOSchema);
registry.register("ProductFilters", ProductFiltersSchema);

registry.register("HealthResponse", HealthResponseSchema);

registry.register("Category", CategorySchema);

registry.register("Banner", BannerSchema);

registry.register("SearchResponse", SearchResponseSchema);

registry.register("Review", ReviewSchema);
registry.register("CreateReviewRequest", CreateReviewRequestSchema);

registry.register("UpdateReviewStatusRequest", UpdateReviewStatusRequestSchema);
registry.register("AdminReviewsListResponse", AdminReviewsListResponseSchema);

registry.register("AuthSession", AuthSessionSchema);
registry.register("AuthSessionsResponse", AuthSessionsResponseSchema);

registry.register("RegisterRequest", RegisterRequestSchema);
registry.register("LoginRequest", LoginRequestSchema);

registry.register("UserResponse", UserResponseSchema);
registry.register("OkResponse", OkResponseSchema);
registry.register("ErrorResponse", ErrorResponseSchema);

registry.register("CartRow", CartRowSchema);
registry.register("CartResponse", CartResponseSchema);
registry.register("AddToCartRequest", AddToCartRequestSchema);
registry.register("RemoveFromCartRequest", RemoveFromCartRequestSchema);

registry.register("WishlistResponse", WishlistResponseSchema);
registry.register("WishlistMutationRequest", WishlistMutationRequestSchema);

registry.register("Recipient", RecipientSchema);
registry.register("Delivery", DeliverySchema);
registry.register("Payment", PaymentSchema);
registry.register("CheckoutRequest", CheckoutRequestSchema);
registry.register("OrderItem", OrderItemSchema);
registry.register("Order", OrderSchema);
registry.register("MyOrdersListResponse", MyOrdersListResponseSchema);

registry.register("AdminBanner", AdminBannerSchema);
registry.register("AdminBannerListResponse", AdminBannerListResponseSchema);

registry.register("AdminCategory", AdminCategorySchema);
registry.register("AdminCategoryListResponse", AdminCategoryListResponseSchema);
registry.register("CreateCategoryRequest", CreateCategoryRequestSchema);
registry.register("UpdateCategoryRequest", UpdateCategoryRequestSchema);
registry.register("SetCategoryActiveRequest", SetCategoryActiveRequestSchema);

registry.register("CheckoutItem", CheckoutItemSchema);

registry.register("AnalyticsEvent", AnalyticsEventSchema);
registry.register("AnalyticsStats", AnalyticsStatsSchema);
registry.register("UpdateOrderStatusRequest", UpdateOrderStatusRequestSchema);

registry.register("AdminOrdersListResponse", AdminOrdersListResponseSchema);

registry.register("AdminProductsListResponse", AdminProductsListResponseSchema);
registry.register("SetProductActiveRequest", SetProductActiveRequestSchema);
registry.register("SetProductFlagsRequest", SetProductFlagsRequestSchema);
registry.register("ProductMutationRequest", ProductMutationRequestSchema);

registry.register("AdminUser", AdminUserSchema);
registry.register("AdminUsersListResponse", AdminUsersListResponseSchema);
registry.register("UpdateUserRoleRequest", UpdateUserRoleRequestSchema);

registry.register("RecentlyViewedResponse", RecentlyViewedResponseSchema);

registry.register("Consultation", ConsultationSchema);
registry.register("CreateConsultationRequest", CreateConsultationRequestSchema);
registry.register("UpdateConsultationStatusRequest", UpdateConsultationStatusRequestSchema);

registry.register("Cooperation", CooperationSchema);
registry.register("CreateCooperationRequest", CreateCooperationRequestSchema);
registry.register("UpdateCooperationStatusRequest", UpdateCooperationStatusRequestSchema);

export function generateOpenAPIDocument() {
    const generator = new OpenApiGeneratorV3(registry.definitions);

    return generator.generateDocument({
        openapi: "3.0.0",
        info: {
            title: "Newsha API",
            version: "1.0.0",
            description: "Newsha e-commerce backend API",
        },
        servers: [
            {
                url:
                    process.env.NODE_ENV === "production"
                        ? "https://api.newsha.com.ua"
                        : `http://localhost:${process.env.PORT || 7183}`,
            },
        ],
    });
}
