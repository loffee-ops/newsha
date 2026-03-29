import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { analyticsApi } from "@/app/analytics/api";

import { PAGE_LIFECYCLE_MIN_DURATION } from "@/app/analytics/config";

export function PageLifecycleTracker() {
    const { pathname, search } = useLocation();

    const enterTs = useRef<number>(0);
    const lastPath = useRef<string | null>(null);

    useEffect(() => {
        const path = pathname + search;

        if (lastPath.current) {
            const duration = Math.round((Date.now() - enterTs.current) / 1000);

            if (duration >= PAGE_LIFECYCLE_MIN_DURATION) {
                analyticsApi.pageLeave(lastPath.current, duration);
                analyticsApi.timeOnPage(lastPath.current, duration);
            }
        }

        lastPath.current = path;
        enterTs.current = Date.now();
    }, [pathname, search]);

    useEffect(() => {
        const onUnload = () => {
            if (!lastPath.current) return;

            const duration = Math.round((Date.now() - enterTs.current) / 1000);
            if (duration >= PAGE_LIFECYCLE_MIN_DURATION) {
                analyticsApi.pageLeave(lastPath.current, duration);
                analyticsApi.timeOnPage(lastPath.current, duration);
            }
        };

        window.addEventListener("beforeunload", onUnload);
        return () => window.removeEventListener("beforeunload", onUnload);
    }, []);

    return null;
}
