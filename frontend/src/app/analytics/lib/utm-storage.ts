import type { UTM } from "@shared/domain/analytics";

import { STORAGE_KEYS } from "@/shared/config";
import { getFromStorage, saveToStorage } from "@/shared/lib/storage";

let cached: UTM | undefined;

export function saveUTMFromUrl(): void {
    if (typeof window === "undefined") {
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const utm: UTM = {};

    const source = params.get("utm_source");
    if (source) {
        utm.source = source;
    }

    const medium = params.get("utm_medium");
    if (medium) {
        utm.medium = medium;
    }

    const campaign = params.get("utm_campaign");
    if (campaign) {
        utm.campaign = campaign;
    }

    if (Object.keys(utm).length === 0) {
        return;
    }

    cached = utm;
    saveToStorage(STORAGE_KEYS.UTM, utm);
}

export function getUTM(): UTM {
    if (cached) {
        return cached;
    }

    const utm = getFromStorage<UTM>(STORAGE_KEYS.UTM, {});
    cached = utm;

    return utm;
}
