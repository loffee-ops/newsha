import type { ID } from "@shared/primitives";

import type { RootState } from "@/app/store";

export const selectWishlist = (state: RootState): readonly ID[] => state.wishlist.items;
export const selectWishlistLoading = (state: RootState): boolean => state.wishlist.isLoading;
export const selectWishlistError = (state: RootState): string | null => state.wishlist.error;

export const selectIsInWishlist =
    (productId: ID) =>
    (state: RootState): boolean =>
        state.wishlist.items.includes(productId);
