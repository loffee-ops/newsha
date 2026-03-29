export const PRODUCT_SORTS = {
    PRICE_ASC: "price_asc",
    PRICE_DESC: "price_desc",
    POPULAR: "popular",
    NEW: "new",
} as const;

export type ProductSort = (typeof PRODUCT_SORTS)[keyof typeof PRODUCT_SORTS];

export const PRODUCTS_API_TEXT = {
    PRODUCT_NOT_FOUND: "Товар не знайдено",
    PRODUCTS_LOAD_ERROR: "Помилка завантаження товарів",
    PRODUCT_CREATE_ERROR: "Не вдалося створити товар",
    PRODUCT_UPDATE_ERROR: "Не вдалося оновити товар",
    PRODUCT_DELETE_ERROR: "Не вдалося видалити товар",
    PRODUCT_FETCH_ERROR: "Не вдалося отримати товар",
    PRODUCT_SEARCH_ERROR: "Помилка пошуку",
} as const;

export const USE_PRODUCT_CARD_TEXT = {
    ADDED_TO_CART: "Додано до кошика",
} as const;
