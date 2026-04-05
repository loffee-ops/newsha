import type {
    CatalogCategorySlug,
    CategoryRootSlug,
    DesiredEffectSlug,
    HairTypeConditionSlug,
} from "./category.types";

export const CATALOG_ROOT_SLUG: CategoryRootSlug = "catalog";
export const DESIRED_EFFECT_ROOT_SLUG: CategoryRootSlug = "desired-effect";
export const HAIR_TYPE_CONDITION_ROOT_SLUG: CategoryRootSlug = "hair-type-condition";

export const CATALOG_SLUGS = new Set<CatalogCategorySlug>([
    "shampoo-cleansing",
    "conditioners",
    "masks-treatment",
    "leave-in-care",
    "oils",
    "heat-protection",
    "scalp-care",
    "anti-dandruff",
    "styling",
    "color-masks",
    "travel-size",
    "body-care",
    "hair-perfumes",
    "for-men",
    "brushes-accessories",
    "packaging",
]);

export const DESIRED_EFFECT_SLUGS = new Set<DesiredEffectSlug>([
    "hydration",
    "smoothness",
    "restoration",
    "volume",
    "blonde",
]);

export const HAIR_TYPE_CONDITION_SLUGS = new Set<HairTypeConditionSlug>([
    "dry-hair",
    "normal-hair",
    "oily-hair",
    "porous-hair",
    "fine-hair",
]);

export const ROOT_CATEGORY_SLUGS = new Set<CategoryRootSlug>([
    CATALOG_ROOT_SLUG,
    DESIRED_EFFECT_ROOT_SLUG,
    HAIR_TYPE_CONDITION_ROOT_SLUG,
]);

export const CATALOG_CATEGORY_LABELS: Record<CatalogCategorySlug, string> = {
    "shampoo-cleansing": "Шампуні та очищення",
    conditioners: "Кондиціонери",
    "masks-treatment": "Маски та відновлення",
    "leave-in-care": "Незмивний догляд",
    oils: "Олія",
    "heat-protection": "Термозахист",
    "scalp-care": "Догляд за шкірою голови",
    "anti-dandruff": "Проти лупи",
    styling: "Стайлінг",
    "color-masks": "Тонуючі маски",
    "travel-size": "Travel size",
    "body-care": "Догляд за тілом",
    "hair-perfumes": "Парфюми для волосся",
    "for-men": "Чоловікам",
    "brushes-accessories": "Браші та аксесуари",
    packaging: "Пакування",
};

export const DESIRED_EFFECT_LABELS: Record<DesiredEffectSlug, string> = {
    hydration: "Зволоження",
    smoothness: "Гладкість",
    restoration: "Відновлення",
    volume: "Обʼєм",
    blonde: "Блонд",
};

export const HAIR_TYPE_CONDITION_LABELS: Record<HairTypeConditionSlug, string> = {
    "dry-hair": "Сухе",
    "normal-hair": "Нормальне",
    "oily-hair": "Жирне",
    "porous-hair": "Пористе",
    "fine-hair": "Тонке",
};

export const CATALOG_CATEGORY_ITEMS: ReadonlyArray<{
    slug: CatalogCategorySlug;
    label: string;
    order: number;
}> = [
    { slug: "shampoo-cleansing", label: "Шампуні та очищення", order: 1 },
    { slug: "conditioners", label: "Кондиціонери", order: 2 },
    { slug: "masks-treatment", label: "Маски та відновлення", order: 3 },
    { slug: "leave-in-care", label: "Незмивний догляд", order: 4 },
    { slug: "oils", label: "Олія", order: 5 },
    { slug: "heat-protection", label: "Термозахист", order: 6 },
    { slug: "scalp-care", label: "Догляд за шкірою голови", order: 7 },
    { slug: "anti-dandruff", label: "Проти лупи", order: 8 },
    { slug: "styling", label: "Стайлінг", order: 9 },
    { slug: "color-masks", label: "Тонуючі маски", order: 10 },
    { slug: "travel-size", label: "Travel size", order: 11 },
    { slug: "body-care", label: "Догляд за тілом", order: 12 },
    { slug: "hair-perfumes", label: "Парфюми для волосся", order: 13 },
    { slug: "for-men", label: "Чоловікам", order: 14 },
    { slug: "brushes-accessories", label: "Браші та аксесуари", order: 15 },
    { slug: "packaging", label: "Пакування", order: 16 },
];

export const DESIRED_EFFECT_ITEMS: ReadonlyArray<{
    slug: DesiredEffectSlug;
    label: string;
    order: number;
}> = [
    { slug: "hydration", label: "Зволоження", order: 1 },
    { slug: "smoothness", label: "Гладкість", order: 2 },
    { slug: "restoration", label: "Відновлення", order: 3 },
    { slug: "volume", label: "Обʼєм", order: 4 },
    { slug: "blonde", label: "Блонд", order: 5 },
];

export const HAIR_TYPE_CONDITION_ITEMS: ReadonlyArray<{
    slug: HairTypeConditionSlug;
    label: string;
    order: number;
}> = [
    { slug: "dry-hair", label: "Сухе", order: 1 },
    { slug: "normal-hair", label: "Нормальне", order: 2 },
    { slug: "oily-hair", label: "Жирне", order: 3 },
    { slug: "porous-hair", label: "Пористе", order: 4 },
    { slug: "fine-hair", label: "Тонке", order: 5 },
];

export function isCatalogCategorySlug(slug: string): slug is CatalogCategorySlug {
    return CATALOG_SLUGS.has(slug as CatalogCategorySlug);
}

export function isDesiredEffectSlug(slug: string): slug is DesiredEffectSlug {
    return DESIRED_EFFECT_SLUGS.has(slug as DesiredEffectSlug);
}

export function isHairTypeConditionSlug(slug: string): slug is HairTypeConditionSlug {
    return HAIR_TYPE_CONDITION_SLUGS.has(slug as HairTypeConditionSlug);
}

export function isRootCategorySlug(slug: string): slug is CategoryRootSlug {
    return ROOT_CATEGORY_SLUGS.has(slug as CategoryRootSlug);
}
