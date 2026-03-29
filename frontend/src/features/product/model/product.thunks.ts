import { createAsyncThunk } from "@reduxjs/toolkit";

import type { ProductsQuery } from "@shared/contracts/product";
import type { ID, Slug } from "@shared/primitives";
import type { AppThunkApiConfig } from "@/app/store/store";

import type { StoreProduct, StoreProductPreview } from "@/entities/product/types";
import {
    dtoToProduct,
    dtoToProductPreview,
    toStoreProduct,
    toStorePreview,
} from "@/entities/product/mapper";
import { PRODUCTS_API_TEXT } from "@/entities/product/config";

type FetchProductsResult = {
    items: StoreProductPreview[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
};

function getErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof Error && error.message.trim()) {
        return error.message;
    }

    if (typeof error === "string" && error.trim()) {
        return error;
    }

    return fallback;
}

export const fetchProducts = createAsyncThunk<
    FetchProductsResult,
    ProductsQuery | undefined,
    AppThunkApiConfig
>("products/fetchList", async (params, { extra, rejectWithValue }) => {
    try {
        const response = await extra.products.getProducts(params);

        return {
            items: response.data.map((product) => toStorePreview(dtoToProductPreview(product))),
            meta: response.meta,
        };
    } catch (error) {
        return rejectWithValue(getErrorMessage(error, PRODUCTS_API_TEXT.PRODUCT_FETCH_ERROR));
    }
});

export const fetchProductById = createAsyncThunk<StoreProduct, ID, AppThunkApiConfig>(
    "products/fetchById",
    async (id, { extra, rejectWithValue }) => {
        try {
            const product = await extra.products.getProductById(id);
            return toStoreProduct(dtoToProduct(product));
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, PRODUCTS_API_TEXT.PRODUCT_FETCH_ERROR));
        }
    },
);

export const fetchProductBySlug = createAsyncThunk<StoreProduct, Slug, AppThunkApiConfig>(
    "products/fetchBySlug",
    async (slug, { extra, rejectWithValue }) => {
        try {
            const product = await extra.products.getProductBySlug(slug);

            if (!product) {
                return rejectWithValue(PRODUCTS_API_TEXT.PRODUCT_NOT_FOUND);
            }

            return toStoreProduct(dtoToProduct(product));
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, PRODUCTS_API_TEXT.PRODUCT_FETCH_ERROR));
        }
    },
);
