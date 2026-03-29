import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { analytics } from "@/entities/analytics/api";

export function PageViewTracker() {
    const location = useLocation();
    const lastPath = useRef<string>("");

    useEffect(() => {
        const path = location.pathname + location.search;

        if (lastPath.current === path) return;

        lastPath.current = path;
        analytics.pageView(path);
    }, [location.pathname, location.search]);

    return null;
}
