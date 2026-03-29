declare global {
    interface Window {
        fbq?: (
            method: "track" | "trackCustom",
            event: string,
            params?: {
                value?: number;
                currency?: string;
                [key: string]: unknown;
            },
        ) => void;

        gtag?: (
            command: "event",
            eventName: string,
            params?: {
                value?: number;
                currency?: string;
                page_path?: string;
                item_id?: string;
                [key: string]: unknown;
            },
        ) => void;
    }
}

export {};
