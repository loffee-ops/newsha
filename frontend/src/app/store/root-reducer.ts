import { combineReducers } from "@reduxjs/toolkit";

import { appReducer } from "./app.slice";

import { adminUserReducer } from "@/features/user/model";
import { adminCategoriesReducer } from "@/features/category/model";
import { adminProductsReducer } from "@/features/product/model";
import { adminBannerReducer } from "@/features/banner/model";
import { adminOrderReducer } from "@/features/order";
import { adminReviewReducer } from "@/features/review/model";

import { analyticsReducer } from "@/features/analytics";
import { authReducer, authUIReducer } from "@/features/auth/model";
import { userReducer } from "@/features/user/model";
import { burgerReducer } from "@/features/burger/model";
import { healthReducer } from "@/features/health";
import { categoryReducer } from "@/features/category/model";
import { productReducer } from "@/features/product/model";
import { bannerReducer } from "@/features/banner/model";
import { cartReducer, cartUIReducer } from "@/features/cart/model";
import { checkoutReducer } from "@/features/checkout/model";
import { orderReducer } from "@/features/order";
import { wishlistReducer } from "@/features/wishlist/model";
import { recentlyViewedReducer } from "@/features/recently-viewed";
import { consultationReducer } from "@/features/consultation/model";
import { consultationUIReducer } from "@/features/consultation/model";
import { cooperationReducer } from "@/features/cooperation/model";
import { reviewReducer } from "@/features/review/model";
import { searchReducer } from "@/features/search/model";
import { searchUIReducer } from "@/features/search/model";

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
    searchUI: searchUIReducer,
});
