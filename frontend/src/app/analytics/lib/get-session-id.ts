import { STORAGE_KEYS } from "@/shared/config";

function createSessionId(): string {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
        return crypto.randomUUID();
    }

    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
        const random = Math.floor(Math.random() * 16);
        const value = char === "x" ? random : (random & 0x3) | 0x8;

        return value.toString(16);
    });
}

function getSessionStorage(): Storage | null {
    try {
        if (typeof window === "undefined") {
            return null;
        }

        return window.sessionStorage;
    } catch {
        return null;
    }
}

export function getSessionId(): string {
    const storage = getSessionStorage();

    if (!storage) {
        return createSessionId();
    }

    try {
        let sessionId = storage.getItem(STORAGE_KEYS.ANALYTICS_SESSION);

        if (!sessionId) {
            sessionId = createSessionId();
            storage.setItem(STORAGE_KEYS.ANALYTICS_SESSION, sessionId);
        }

        return sessionId;
    } catch {
        return createSessionId();
    }
}
