const cache = new Map<string, Promise<unknown>>();

export function prefetch<T>(key: string, loader: () => Promise<T>): Promise<T> {
    if (!cache.has(key)) {
        const promise = loader().catch((err) => {
            cache.delete(key);
            throw err;
        });

        cache.set(key, promise);
    }

    return cache.get(key)! as Promise<T>;
}
