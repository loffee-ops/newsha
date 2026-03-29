import type { Slug } from "@shared/primitives";

export const NEED_CATEGORY_SLUGS = [
    "cat-need-hydration",
    "cat-need-nutrition",
    "cat-need-repair",
    "cat-need-shine",
    "cat-need-smooth",
    "cat-need-volume",
    "cat-need-anti-frizz",
    "cat-need-curls",
    "cat-need-easy-detangling",
    "cat-need-growth",
    "cat-need-color-save",
    "cat-need-extensions-care",
] as const;

export type NeedCategorySlug = (typeof NEED_CATEGORY_SLUGS)[number];

export const NEED_SLUG_LABELS: Record<NeedCategorySlug, string> = {
    "cat-need-hydration": "Зволоження",
    "cat-need-nutrition": "Живлення",
    "cat-need-repair": "Відновлення",
    "cat-need-shine": "Блиск",
    "cat-need-smooth": "Гладкість",
    "cat-need-volume": "Обʼєм",
    "cat-need-anti-frizz": "Анти-фриз",
    "cat-need-curls": "Кучері",
    "cat-need-easy-detangling": "Легке розчісування",
    "cat-need-growth": "Стимуляція росту",
    "cat-need-color-save": "Збереження кольору",
    "cat-need-extensions-care": "Догляд за нарощеним волоссям",
};

export const NEED_KEYWORD_TO_SLUG: Record<string, NeedCategorySlug> = {
    зволоження: "cat-need-hydration",
    зволожуючий: "cat-need-hydration",
    зволожуюче: "cat-need-hydration",
    hydration: "cat-need-hydration",
    moisturizing: "cat-need-hydration",

    живлення: "cat-need-nutrition",
    nutrition: "cat-need-nutrition",

    відновлення: "cat-need-repair",
    repair: "cat-need-repair",
    restoring: "cat-need-repair",

    блиск: "cat-need-shine",
    shine: "cat-need-shine",
    glossy: "cat-need-shine",

    гладкість: "cat-need-smooth",
    smooth: "cat-need-smooth",
    smoothing: "cat-need-smooth",

    "об’єм": "cat-need-volume",
    обєм: "cat-need-volume",
    volume: "cat-need-volume",

    антифриз: "cat-need-anti-frizz",
    "анти-фриз": "cat-need-anti-frizz",
    "anti-frizz": "cat-need-anti-frizz",
    frizz: "cat-need-anti-frizz",

    кучері: "cat-need-curls",
    кудрі: "cat-need-curls",
    curls: "cat-need-curls",
    curling: "cat-need-curls",

    "легке розчісування": "cat-need-easy-detangling",
    detangle: "cat-need-easy-detangling",
    detangling: "cat-need-easy-detangling",

    "стимуляція росту": "cat-need-growth",
    "ріст волосся": "cat-need-growth",
    growth: "cat-need-growth",

    "збереження кольору": "cat-need-color-save",
    "color save": "cat-need-color-save",
    "color-protection": "cat-need-color-save",

    нарощування: "cat-need-extensions-care",
    extensions: "cat-need-extensions-care",
};

export function isNeedCategorySlug(value: string): value is NeedCategorySlug {
    return NEED_CATEGORY_SLUGS.includes(value as NeedCategorySlug);
}

export function isNeedSlug(value: Slug): boolean {
    return isNeedCategorySlug(value);
}

export function getNeedLabel(slug: NeedCategorySlug): string {
    return NEED_SLUG_LABELS[slug];
}

export function getNeedSlugByKeyword(keyword: string): NeedCategorySlug | undefined {
    return NEED_KEYWORD_TO_SLUG[keyword.trim().toLowerCase()];
}
