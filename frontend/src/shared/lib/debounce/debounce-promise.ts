export function debouncePromise<Args extends unknown[], R>(
    fn: (signal: AbortSignal, ...args: Args) => Promise<R>,
    delay: number,
): (...args: Args) => Promise<R> {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    let controller: AbortController | null = null;

    return (...args: Args): Promise<R> => {
        if (timeout) clearTimeout(timeout);
        if (controller) controller.abort();

        controller = new AbortController();
        const signal = controller.signal;

        return new Promise<R>((resolve, reject) => {
            timeout = setTimeout(() => {
                fn(signal, ...args)
                    .then(resolve)
                    .catch(reject);
            }, delay);
        });
    };
}
