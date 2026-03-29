import { combineReducers } from "@reduxjs/toolkit";

import { appReducer } from "./app.slice";

import { adminUserReducer } from "@/features/user/model";
import { adminCategoriesReducer } from "@/features/category/model/admin-categories.slice";
import { adminProductsReducer } from "@/features/product/model/admin-products.slice";
import { adminBannerReducer } from "@/features/banner/model/admin-banner.slice";
import { adminOrderReducer } from "@/features/order/admin-order.slice";
import { adminReviewReducer } from "@/features/review/model/admin-review.slice";

import { analyticsReducer } from "@/features/analytics";
import { authReducer } from "@/features/auth/model/auth.slice";
import { authUIReducer } from "@/features/auth/model/auth-ui.slice";
import { userReducer } from "@/features/user/model";
import { burgerReducer } from "@/features/burger/model";
import { healthReducer } from "@/features/health/health.slice";
import { categoryReducer } from "@/features/category/model";
import { productReducer } from "@/features/product/model/product.slice";
import { bannerReducer } from "@/features/banner/model";
import { cartReducer, cartUIReducer } from "@/features/cart/model";
import { checkoutReducer } from "@/features/checkout/model/checkout.slice";
import { orderReducer } from "@/features/order";
import { wishlistReducer } from "@/features/wishlist/model";
import { recentlyViewedReducer } from "@/features/recently-viewed/recently-viewed.slice";
import { consultationReducer } from "@/features/consultation/model/consultation.slice";
import { consultationUIReducer } from "@/features/consultation/model";
import { cooperationReducer } from "@/features/cooperation/model";
import { reviewReducer } from "@/features/review/model/review.slice";
import { searchReducer } from "@/features/search/search.slice";

export const rootReducer = combineReducers({
    app: appReducer,

    adminUser: adminUserReducer,
    adminCategories: adminCategoriesReducer,
    adminProducts: adminProductsReducer,
    adminBanner: adminBannerReducer,
    adminReview: adminReviewReducer,
    adminOrder: adminOrderReducer,

    analytics: analyticsReducer,
    health: healthReducer,
    auth: authReducer,
    authUI: authUIReducer,
    user: userReducer,
    burger: burgerReducer,
    category: categoryReducer,
    product: productReducer,
    banner: bannerReducer,
    cart: cartReducer,
    cartUI: cartUIReducer,
    wishlist: wishlistReducer,
    recentlyViewed: recentlyViewedReducer,
    checkout: checkoutReducer,
    order: orderReducer,
    review: reviewReducer,
    consultation: consultationReducer,
    consultationUI: consultationUIReducer,
    cooperation: cooperationReducer,
    search: searchReducer,
});
