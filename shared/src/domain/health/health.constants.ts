export const HEALTH_STATUS = {
    OK: "ok",
    ERROR: "error",
} as const;

export const DB_STATUS = {
    UP: "up",
    DOWN: "down",
    CONNECTING: "connecting",
    DISCONNECTING: "disconnecting",
} as const;

export const REDIS_STATUS = {
    UP: "up",
    DOWN: "down",
    CONNECTING: "connecting",
} as const;
