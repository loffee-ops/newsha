import { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";

import { openLoginModal, selectIsAuthenticated } from "@/features/auth/model";
import {
    selectWishlist,
    selectWishlistLoading,
    selectWishlistError,
    toggleWishlistItem,
} from "@/features/wishlist/model";

import type { ID } from "@shared/primitives";

export function useWishlist() {
    const dispatch = useAppDispatch();

    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const wishlist = useAppSelector(selectWishlist);
    const isLoading = useAppSelector(selectWishlistLoading);
    const error = useAppSelector(selectWishlistError);

    const toggle = useCallback(
        async (productId: ID) => {
            if (!isAuthenticated) {
                dispatch(openLoginModal());
                return;
            }

            await dispatch(toggleWishlistItem(productId)).unwrap();
        },
        [dispatch, isAuthenticated],
    );

    const isInWishlist = useCallback((productId: ID) => wishlist.includes(productId), [wishlist]);

    return {
        toggle,
        isInWishlist,
        ids: wishlist,
        isLoading,
        error,
    };
}
