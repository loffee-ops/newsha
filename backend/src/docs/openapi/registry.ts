import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";

import {
    ProductDTOSchema,
    ProductPreviewDTOSchema,
    UpdateReviewStatusRequestSchema,
    AdminReviewsListResponseSchema,
    AdminBannerSchema,
    AdminBannerListResponseSchema,
    AdminCategoryListResponseSchema,
    AdminCategorySchema,
    AdminOrdersListResponseSchema,
    AdminProductsListResponseSchema,
    AdminUserSchema,
    AdminUsersListResponseSchema,
    ProductFiltersSchema,
    SetProductActiveRequestSchema,
    SetProductFlagsRequestSchema,
    ProductMutationRequestSchema,
    HealthResponseSchema,
    CategorySchema,
    CreateCategoryRequestSchema,
    SetCategoryActiveRequestSchema,
    UpdateCategoryRequestSchema,
    BannerSchema,
    SearchResponseSchema,
    ReviewSchema,
    CreateReviewRequestSchema,
    AuthSessionSchema,
    AuthSessionsResponseSchema,
    UpdateUserRoleRequestSchema,
    LoginRequestSchema,
    RegisterRequestSchema,
    UserResponseSchema,
    OkResponseSchema,
    ErrorResponseSchema,
    CartResponseSchema,
    CartRowSchema,
    AddToCartRequestSchema,
    RemoveFromCartRequestSchema,
    WishlistResponseSchema,
    WishlistMutationRequestSchema,
    RecipientSchema,
    DeliverySchema,
    PaymentSchema,
    CheckoutRequestSchema,
    OrderItemSchema,
    OrderSchema,
    UpdateOrderStatusRequestSchema,
    MyOrdersListResponseSchema,
    CheckoutItemSchema,
    AnalyticsEventSchema,
    AnalyticsStatsSchema,
    RecentlyViewedResponseSchema,
    ConsultationSchema,
    CreateConsultationRequestSchema,
    UpdateConsultationStatusRequestSchema,
    CooperationSchema,
    CreateCooperationRequestSchema,
    UpdateCooperationStatusRequestSchema,
} from "./schemas";

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
