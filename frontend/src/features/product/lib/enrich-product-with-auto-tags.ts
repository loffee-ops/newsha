import type { Product } from "@/entities/product/types";
import { NEED_KEYWORD_TO_SLUG, CONDITION_KEYWORD_TO_SLUG } from "@/entities/product/config";

import { normalizeText, matchesKeyword } from "@/shared/lib/search";

type NeedTag = (typeof NEED_KEYWORD_TO_SLUG)[keyof typeof NEED_KEYWORD_TO_SLUG];
type ConditionTag = (typeof CONDITION_KEYWORD_TO_SLUG)[keyof typeof CONDITION_KEYWORD_TO_SLUG];

export function enrichProductWithAutoTags(product: Product): Product {
    const combinedText = normalizeText(
        [...(product.tags ?? []), product.shortDescription ?? "", product.description].join(" "),
    );

    const needs = new Set<NeedTag>();
    const conditions = new Set<ConditionTag>();

    for (const [keyword, categorySlug] of Object.entries(NEED_KEYWORD_TO_SLUG)) {
        if (matchesKeyword(combinedText, keyword)) {
            needs.add(categorySlug);
        }
    }

    for (const [keyword, categorySlug] of Object.entries(CONDITION_KEYWORD_TO_SLUG)) {
        if (matchesKeyword(combinedText, keyword)) {
            conditions.add(categorySlug);
        }
    }

    return {
        ...product,
        needs: product.needs?.length ? product.needs : Array.from(needs),
        condition: product.condition?.length ? product.condition : Array.from(conditions),
    };
}
