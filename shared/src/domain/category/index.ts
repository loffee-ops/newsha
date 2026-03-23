export { CONDITION_ROOT_SLUG, NEEDS_ROOT_SLUG } from "./category.constants";
export { CATALOG_SLUGS } from "./category.catalog";
export { buildCategoryTree } from "./category.tree";
export { createCategoryMaps } from "./category.maps";
export { ensureUniqueCategorySlug } from "./category.guards";
export {
    isLeafCategory,
    isRootCategory,
    slugifyCategory,
    getCatalogCategories,
} from "./category.utils";

export type { Category, CategoryNode, CatalogCategorySlug } from "./category.types";
