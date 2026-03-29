import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@/app/store/store";
import type { StoreProduct, StoreProductPreview } from "@/entities/product/types";
import type { Slug } from "@shared/primitives";

export const selectProductState = (state: RootState) => state.product;

export const selectProductPreviews = (state: RootState) => selectProductState(state).items;
export const selectProductListMeta = (state: RootState) => selectProductState(state).itemsMeta;
export const selectProductSearchItems = (state: RootState) => selectProductState(state).searchItems;
export const selectProductSelected = (state: RootState) => selectProductState(state).selected;

export const selectProductListStatus = (state: RootState) => selectProductState(state).listStatus;
export const selectProductSearchStatus = (state: RootState) =>
    selectProductState(state).searchStatus;
export const selectProductSelectedStatus = (state: RootState) =>
    selectProductState(state).selectedStatus;

export const selectProductError = (state: RootState) => selectProductState(state).error;

export const selectIsProductsLoaded = createSelector(
    [selectProductPreviews],
    (items) => items.length > 0,
);

export const selectHasSearchResults = createSelector(
    [selectProductSearchItems],
    (items) => items.length > 0,
);

export const selectNewArrivals = createSelector([selectProductPreviews], (products) =>
    products.filter((product) => product.isNew).slice(0, 4),
);

export const makeSelectProductPreviewBySlug = () =>
    createSelector(
        [selectProductPreviews, (_: RootState, slug: Slug) => slug],
        (products, slug): StoreProductPreview | undefined =>
            products.find((product) => product.slug === slug),
    );

export const makeSelectSearchPreviewBySlug = () =>
    createSelector(
        [selectProductSearchItems, (_: RootState, slug: Slug) => slug],
        (products, slug): StoreProductPreview | undefined =>
            products.find((product) => product.slug === slug),
    );

export const makeSelectSelectedProductBySlug = () =>
    createSelector(
        [selectProductSelected, (_: RootState, slug: Slug) => slug],
        (product, slug): StoreProduct | undefined =>
            product && product.slug === slug ? product : undefined,
    );
