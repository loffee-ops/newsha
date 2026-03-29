import type { Slug } from "@shared/primitives";

export const CONDITION_CATEGORY_SLUGS = [
    "cat-scalp-oily",
    "cat-scalp-dry",
    "cat-scalp-sensitive",
    "cat-scalp-dandruff",
    "cat-scalp-itch",
    "cat-scalp-hairloss",
    "cat-structure-porosity",
    "cat-structure-breakage",
    "cat-structure-split-ends",
    "cat-structure-no-shine",
    "cat-after-color",
    "cat-after-blond",
    "cat-after-keratin",
] as const;

export type ConditionCategorySlug = (typeof CONDITION_CATEGORY_SLUGS)[number];

export const CONDITION_SLUG_LABELS: Record<ConditionCategorySlug, string> = {
    "cat-scalp-oily": "Жирна шкіра голови",
    "cat-scalp-dry": "Суха шкіра голови",
    "cat-scalp-sensitive": "Чутлива шкіра голови",
    "cat-scalp-dandruff": "Лупа",
    "cat-scalp-itch": "Свербіж",
    "cat-scalp-hairloss": "Випадіння волосся",
    "cat-structure-porosity": "Пористість",
    "cat-structure-breakage": "Ламкість",
    "cat-structure-split-ends": "Посічені кінчики",
    "cat-structure-no-shine": "Без блиску",
    "cat-after-color": "Після фарбування",
    "cat-after-blond": "Після блондування",
    "cat-after-keratin": "Після кератину",
};

export const CONDITION_KEYWORD_TO_SLUG: Record<string, ConditionCategorySlug> = {
    "жирна шкіра голови": "cat-scalp-oily",
    жирна: "cat-scalp-oily",
    oily: "cat-scalp-oily",

    сухість: "cat-scalp-dry",
    суха: "cat-scalp-dry",
    dry: "cat-scalp-dry",

    чутлива: "cat-scalp-sensitive",
    sensitive: "cat-scalp-sensitive",

    лупа: "cat-scalp-dandruff",
    dandruff: "cat-scalp-dandruff",

    свербіж: "cat-scalp-itch",
    itch: "cat-scalp-itch",

    випадіння: "cat-scalp-hairloss",
    hairloss: "cat-scalp-hairloss",

    пористість: "cat-structure-porosity",
    пористе: "cat-structure-porosity",
    porous: "cat-structure-porosity",

    ломкість: "cat-structure-breakage",
    breakage: "cat-structure-breakage",

    "посічені кінчики": "cat-structure-split-ends",
    splits: "cat-structure-split-ends",

    "без блиску": "cat-structure-no-shine",
    dull: "cat-structure-no-shine",

    фарбування: "cat-after-color",
    "після фарбування": "cat-after-color",
    color: "cat-after-color",

    блонд: "cat-after-blond",
    "після блонду": "cat-after-blond",
    blond: "cat-after-blond",

    кератин: "cat-after-keratin",
    "після кератину": "cat-after-keratin",
    keratin: "cat-after-keratin",
};

export function isConditionCategorySlug(value: string): value is ConditionCategorySlug {
    return CONDITION_CATEGORY_SLUGS.includes(value as ConditionCategorySlug);
}

export function isConditionSlug(value: Slug): boolean {
    return isConditionCategorySlug(value);
}

export function getConditionLabel(slug: ConditionCategorySlug): string {
    return CONDITION_SLUG_LABELS[slug];
}

export function getConditionSlugByKeyword(keyword: string): ConditionCategorySlug | undefined {
    return CONDITION_KEYWORD_TO_SLUG[keyword.trim().toLowerCase()];
}
