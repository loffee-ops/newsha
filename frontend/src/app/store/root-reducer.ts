import { combineReducers } from "@reduxjs/toolkit";

import { appReducer } from "./app.slice";
import { authReducer } from "@/features/auth/model/auth.slice";
import { authUIReducer } from "@/features/auth/model/auth-ui.slice";

import { cartReducer } from "@/features/cart/model";
import { cartUIReducer } from "@/features/cart/model";
import { productReducer } from "@/features/product/model/product.slice";

import { bannersReducer } from "@/features/banner";

import { orderReducer } from "@/features/order";

import { wishlistReducer } from "@/features/wishlist/model";

export const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    authUI: authUIReducer,

    cart: cartReducer,
    cartUI: cartUIReducer,
    product: productReducer,

    banners: bannersReducer,

    order: orderReducer,

    wishlist: wishlistReducer,
});
