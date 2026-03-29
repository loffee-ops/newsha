export const STORAGE_KEYS = {
    CART: "newsha_cart",
    TOKEN: "newsha_token",
    WISHLIST: "newsha_wishlist",
    AUTH_SESSION: "newsha.auth.session",
    AUTH_USER: "newsha.auth.user",
    ANALYTICS_SESSION: "analytics_session_id",
    UTM: "utm",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
