import type { AppErrorDTO } from "@shared/contracts/error";

type ErrorListener = (error: AppErrorDTO) => void;

const listeners = new Set<ErrorListener>();

export const logger = {
    report(error: AppErrorDTO) {
        console.error("APP ERROR:", error);

        listeners.forEach((listener) => {
            try {
                listener(error);
            } catch (err) {
                console.error("Logger listener failed:", err);
            }
        });
    },

    subscribe(listener: ErrorListener) {
        listeners.add(listener);

        return () => {
            listeners.delete(listener);
        };
    },
};
