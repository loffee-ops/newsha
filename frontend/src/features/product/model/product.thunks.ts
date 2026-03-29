import { createAsyncThunk } from "@reduxjs/toolkit";

import type { ProductsQuery } from "@shared/contracts/product";
import type { ID, Slug } from "@shared/primitives";

import type { StoreProduct, StoreProductPreview } from "@/entities/product/types";
import { productsApi } from "@/entities/product/api";
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

export const fetchProducts = createAsyncThunk<
    FetchProductsResult,
    ProductsQuery | undefined,
    { rejectValue: string }
>("products/fetchList", async (params, { rejectWithValue }) => {
    try {
        const response = await productsApi.getProducts(params);

        return {
            items: response.data.map((product) => toStorePreview(dtoToProductPreview(product))),
            meta: response.meta,
        };
    } catch {
        return rejectWithValue(PRODUCTS_API_TEXT.PRODUCT_FETCH_ERROR);
    }
});

export const fetchProductById = createAsyncThunk<StoreProduct, ID, { rejectValue: string }>(
    "products/fetchById",
    async (id, { rejectWithValue }) => {
        try {
            const product = await productsApi.getProductById(id);

            if (!product) {
                return rejectWithValue(PRODUCTS_API_TEXT.PRODUCT_NOT_FOUND);
            }

            return toStoreProduct(dtoToProduct(product));
        } catch {
            return rejectWithValue(PRODUCTS_API_TEXT.PRODUCT_FETCH_ERROR);
        }
    },
);

export const fetchProductBySlug = createAsyncThunk<StoreProduct, Slug, { rejectValue: string }>(
    "products/fetchBySlug",
    async (slug, { rejectWithValue }) => {
        try {
            const product = await productsApi.getProductBySlug(slug);

            if (!product) {
                return rejectWithValue(PRODUCTS_API_TEXT.PRODUCT_NOT_FOUND);
            }

            return toStoreProduct(dtoToProduct(product));
        } catch {
            return rejectWithValue(PRODUCTS_API_TEXT.PRODUCT_FETCH_ERROR);
        }
    },
);

export const searchProducts = createAsyncThunk<
    StoreProductPreview[],
    { query: string },
    { rejectValue: string }
>("products/search", async ({ query }, { rejectWithValue }) => {
    try {
        const result = await productsApi.searchProducts(query);

        return result.map((product) => toStorePreview(dtoToProductPreview(product)));
    } catch {
        return rejectWithValue(PRODUCTS_API_TEXT.PRODUCT_SEARCH_ERROR);
    }
});
