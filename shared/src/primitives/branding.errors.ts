export const BRAND_ERRORS = {
    ID_EMPTY: "ID must be a non-empty string",
    SLUG_EMPTY: "Slug must be a non-empty string",
    ISO_DATE_INVALID: "Invalid ISO date",
    MONEY_INVALID: "Money must be a non-negative integer (cents)",
    QUANTITY_INVALID: "Quantity must be a non-negative integer",
    MONEY_FINITE_NON_NEGATIVE: "Money value must be a finite non-negative number",
    SUBTOTAL_INVALID: "Subtotal must be a non-negative integer",
    PERCENT_INVALID: "Percent must be between 0 and 100",
    AUTH_TOKEN_INVALID: "Invalid auth token",
} as const;
