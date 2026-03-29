import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { analytics } from "@/entities/analytics/api";

export function AnalyticsRouterTracker() {
    const { pathname, search } = useLocation();
    const last = useRef("");

    useEffect(() => {
        const path = pathname + search;
        if (last.current === path) return;
        last.current = path;

        queueMicrotask(() => analytics.pageView(path));
    }, [pathname, search]);

    return null;
}
