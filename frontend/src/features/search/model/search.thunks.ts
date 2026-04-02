import { createAsyncThunk } from "@reduxjs/toolkit";

import type { SearchParamsDTO } from "@shared/contracts/search";

import type { AppThunkApiConfig } from "@/app/store";

import type { StoreProductPreview } from "@/entities/product/types";
import { dtoToProductPreview, toStorePreview } from "@/entities/product/mapper";

function getErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof Error && error.message.trim()) {
        return error.message;
    }

    if (typeof error === "string" && error.trim()) {
        return error;
    }

    return fallback;
}

export const searchProducts = createAsyncThunk<
    { items: StoreProductPreview[]; query: string },
    SearchParamsDTO,
    AppThunkApiConfig
>("search/searchProducts", async (params, { extra, rejectWithValue }) => {
    try {
        const items = await extra.search.searchProducts(params);

        return {
            query: params.query,
            items: items.map((product) => toStorePreview(dtoToProductPreview(product))),
        };
    } catch (error) {
        return rejectWithValue(getErrorMessage(error, "Failed to search products"));
    }
});
