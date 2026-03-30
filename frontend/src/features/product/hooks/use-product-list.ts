import { useMemo } from "react";
import { useSearchParams, useParams } from "react-router-dom";

import { useAppSelector } from "@/app/store";

import type { StoreProductPreview } from "@/entities/product/types";

import { parseProductFilters } from "@/features/product/lib";
import { selectProductPreviews, selectProductListStatus } from "@/features/product/model";
import { selectCategories } from "@/features/category/model";

export function useProductList(externalProducts?: readonly StoreProductPreview[]) {
    const storeProducts = useAppSelector(selectProductPreviews);
    const status = useAppSelector(selectProductListStatus);
    const categories = useAppSelector(selectCategories);

    const [searchParams] = useSearchParams();
    const { slug } = useParams<{ slug?: string }>();

    const products: readonly StoreProductPreview[] = externalProducts ?? storeProducts;

    const filters = useMemo(() => parseProductFilters(searchParams), [searchParams]);

    const categoryId = useMemo(() => {
        if (!slug) return null;
        return categories.find((c) => c.slug === slug)?.id ?? null;
    }, [slug, categories]);

    const filteredProducts = useMemo(() => {
        if (!products.length) return [];

        return products.filter((product) => {
            if (categoryId && product.categoryId !== categoryId) {
                return false;
            }

            if (filters.categoryId && product.categoryId !== filters.categoryId) {
                return false;
            }

            if (filters.needs.length > 0) {
                const hasNeed = filters.needs.some((need) => product.needs?.includes(need));
                if (!hasNeed) {
                    return false;
                }
            }

            if (filters.condition.length > 0) {
                const hasCondition = filters.condition.some((condition) =>
                    product.condition?.includes(condition),
                );
                if (!hasCondition) {
                    return false;
                }
            }

            if (filters.tags.length > 0) {
                const hasTag = filters.tags.some((tag) => product.tags?.includes(tag));
                if (!hasTag) {
                    return false;
                }
            }

            if (filters.volumes.length > 0) {
                const hasVolume = product.volumes?.some((volume) =>
                    filters.volumes.includes(volume.value),
                );

                if (!hasVolume) {
                    return false;
                }
            }

            if (filters.price.min !== undefined || filters.price.max !== undefined) {
                const prices = product.volumes?.map((volume) => Number(volume.price)) ?? [];

                if (prices.length === 0) {
                    return false;
                }

                const matchesPrice = prices.some((price) => {
                    if (filters.price.min !== undefined && price < filters.price.min) {
                        return false;
                    }

                    if (filters.price.max !== undefined && price > filters.price.max) {
                        return false;
                    }

                    return true;
                });

                if (!matchesPrice) {
                    return false;
                }
            }

            return true;
        });
    }, [products, filters, categoryId]);

    const isEmpty = status === "succeeded" && filteredProducts.length === 0;

    return {
        products: filteredProducts,
        status,
        isEmpty,
    };
}
