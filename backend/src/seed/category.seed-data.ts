import {
    CATALOG_ROOT_SLUG,
    DESIRED_EFFECT_ROOT_SLUG,
    HAIR_TYPE_CONDITION_ROOT_SLUG,
    CATALOG_CATEGORY_ITEMS,
    DESIRED_EFFECT_ITEMS,
    HAIR_TYPE_CONDITION_ITEMS,
} from "@shared/domain/category";

export const ROOT_CATEGORIES = [
    {
        slug: CATALOG_ROOT_SLUG,
        name: "Каталог",
        nameUa: "Каталог",
        nameEn: "Catalog",
        description: "Основні категорії каталогу",
        image: null,
        parentId: null,
        isActive: true,
        order: 1,
        showOnHome: false,
    },
    {
        slug: DESIRED_EFFECT_ROOT_SLUG,
        name: "Бажаний ефект",
        nameUa: "Бажаний ефект",
        nameEn: "Desired Effect",
        description: "Категорії за бажаним ефектом",
        image: null,
        parentId: null,
        isActive: true,
        order: 2,
        showOnHome: false,
    },
    {
        slug: HAIR_TYPE_CONDITION_ROOT_SLUG,
        name: "Тип та стан волосся",
        nameUa: "Тип та стан волосся",
        nameEn: "Hair Type and Condition",
        description: "Категорії за типом і станом волосся",
        image: null,
        parentId: null,
        isActive: true,
        order: 3,
        showOnHome: false,
    },
] as const;

const CATALOG_CATEGORY_NAME_EN: Record<string, string> = {
    "shampoo-cleansing": "Shampoo & Cleansing",
    conditioners: "Conditioners",
    "masks-treatment": "Masks & Treatment",
    "leave-in-care": "Leave-In Care",
    oils: "Oils",
    "heat-protection": "Heat Protection",
    "scalp-care": "Scalp Care",
    "anti-dandruff": "Anti-Dandruff",
    styling: "Styling",
    "color-masks": "Color Masks",
    "travel-size": "Travel Size",
    "body-care": "Body Care",
    "hair-perfumes": "Hair Perfumes",
    "for-men": "For Men",
    "brushes-accessories": "Brushes & Accessories",
    packaging: "Packaging",
};

const DESIRED_EFFECT_NAME_EN: Record<string, string> = {
    hydration: "Hydration",
    smoothness: "Smoothness",
    restoration: "Restoration",
    volume: "Volume",
    blonde: "Blonde",
};

const HAIR_TYPE_CONDITION_NAME_EN: Record<string, string> = {
    "dry-hair": "Dry Hair",
    "normal-hair": "Normal Hair",
    "oily-hair": "Oily Hair",
    "porous-hair": "Porous Hair",
    "fine-hair": "Fine Hair",
};

export const CATALOG_CHILD_CATEGORIES = CATALOG_CATEGORY_ITEMS.map((item) => ({
    slug: item.slug,
    name: item.label,
    nameUa: item.label,
    nameEn: CATALOG_CATEGORY_NAME_EN[item.slug],
    description: null,
    image: null,
    parentSlug: CATALOG_ROOT_SLUG,
    isActive: true,
    order: item.order,
    showOnHome: true,
}));

export const DESIRED_EFFECT_CHILD_CATEGORIES = DESIRED_EFFECT_ITEMS.map((item) => ({
    slug: item.slug,
    name: item.label,
    nameUa: item.label,
    nameEn: DESIRED_EFFECT_NAME_EN[item.slug],
    description: null,
    image: null,
    parentSlug: DESIRED_EFFECT_ROOT_SLUG,
    isActive: true,
    order: item.order,
    showOnHome: false,
}));

export const HAIR_TYPE_CONDITION_CHILD_CATEGORIES = HAIR_TYPE_CONDITION_ITEMS.map((item) => ({
    slug: item.slug,
    name: item.label,
    nameUa: item.label,
    nameEn: HAIR_TYPE_CONDITION_NAME_EN[item.slug],
    description: null,
    image: null,
    parentSlug: HAIR_TYPE_CONDITION_ROOT_SLUG,
    isActive: true,
    order: item.order,
    showOnHome: false,
}));

export const CHILD_CATEGORIES = [
    ...CATALOG_CHILD_CATEGORIES,
    ...DESIRED_EFFECT_CHILD_CATEGORIES,
    ...HAIR_TYPE_CONDITION_CHILD_CATEGORIES,
] as const;
