export const wait = (ms = 300): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export const sleep = wait;

export const waitRandom = (min: number, max: number): Promise<void> => {
    const ms = Math.floor(Math.random() * (max - min + 1)) + min;
    return wait(ms);
};

export function waitAbortable(ms: number, signal: AbortSignal): Promise<void> {
    return new Promise((resolve, reject) => {
        if (signal.aborted) {
            reject(new DOMException("Aborted", "AbortError"));
            return;
        }

        const timeout = setTimeout(resolve, ms);

        signal.addEventListener(
            "abort",
            () => {
                clearTimeout(timeout);
                reject(new DOMException("Aborted", "AbortError"));
            },
            { once: true },
        );
    });
}
