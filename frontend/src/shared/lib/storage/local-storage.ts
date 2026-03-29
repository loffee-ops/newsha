import type { StorageKey } from "@/shared/config";

function getStorage(): Storage | null {
    try {
        if (typeof window === "undefined") {
            return null;
        }

        return window.localStorage;
    } catch {
        return null;
    }
}

export function getFromStorage<T>(key: StorageKey, fallback: T): T {
    const storage = getStorage();

    if (!storage) {
        return fallback;
    }

    try {
        const raw = storage.getItem(key);

        if (raw === null) {
            return fallback;
        }

        return JSON.parse(raw) as T;
    } catch {
        return fallback;
    }
}

export function saveToStorage<T>(key: StorageKey, value: T): void {
    const storage = getStorage();

    if (!storage) {
        return;
    }

    try {
        storage.setItem(key, JSON.stringify(value));
    } catch {
        // ignore storage write errors
    }
}

export function removeFromStorage(key: StorageKey): void {
    const storage = getStorage();

    if (!storage) {
        return;
    }

    try {
        storage.removeItem(key);
    } catch {
        // ignore storage remove errors
    }
}
