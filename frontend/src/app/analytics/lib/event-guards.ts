const fired = new Set<string>();

export function fireOnce(key: string, fire: () => void) {
    if (fired.has(key)) return;
    fired.add(key);
    fire();
}

let lastSearch = "";
let lastTime = 0;

export function fireSearchOnce(query: string, fire: () => void) {
    const now = Date.now();
    if (query === lastSearch && now - lastTime < 1200) return;
    lastSearch = query;
    lastTime = now;
    fire();
}
