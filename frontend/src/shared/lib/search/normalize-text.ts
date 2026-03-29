const normalizationCache = new Map<string, string>();

export function normalizeText(text: string): string {
    if (normalizationCache.has(text)) {
        return normalizationCache.get(text)!;
    }

    const normalized = text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[.,/#!$%^&*;:{}="_`~()]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    normalizationCache.set(text, normalized);
    return normalized;
}
