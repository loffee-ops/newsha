export {
    NEED_CATEGORY_SLUGS,
    NEED_SLUG_LABELS,
    NEED_KEYWORD_TO_SLUG,
    isNeedCategorySlug,
    isNeedSlug,
    getNeedLabel,
    getNeedSlugByKeyword,
} from "./needs.keywords";
export {
    CONDITION_CATEGORY_SLUGS,
    CONDITION_SLUG_LABELS,
    CONDITION_KEYWORD_TO_SLUG,
    isConditionCategorySlug,
    isConditionSlug,
    getConditionLabel,
    getConditionSlugByKeyword,
} from "./condition.keywords";
export { PRODUCTS_API_TEXT, PRODUCT_SORTS, USE_PRODUCT_CARD_TEXT } from "./product-sort.config";

export type { NeedCategorySlug } from "./needs.keywords";
export type { ConditionCategorySlug } from "./condition.keywords";
export type { ProductSort } from "./product-sort.config";
