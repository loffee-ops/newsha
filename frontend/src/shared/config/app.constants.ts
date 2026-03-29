import { APP_TEXT } from "./app.text";

export const CONSTANTS = {
    DEFAULT_LANGUAGE: "ua",

    CURRENCY: {
        CODE: "UAH",
        DISPLAY: "грн",
    },

    PAGINATION: {
        PRODUCTS_PER_PAGE: 20,
    },

    SEO_DEFAULT: {
        title: APP_TEXT.SEO_TITLE,
        description: APP_TEXT.SEO_DESCRIPTION,
    },
} as const;
