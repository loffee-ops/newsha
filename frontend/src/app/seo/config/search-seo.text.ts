export const SEARCH_SEO_TEXT = {
    titleTemplate: (query: string) => `Пошук: ${query} — NEWSHA`,
    descriptionTemplate: (query: string) => `Результати пошуку "${query}" в каталозі NEWSHA`,
    canonicalBase: "https://newsha.com.ua/search",
} as const;
