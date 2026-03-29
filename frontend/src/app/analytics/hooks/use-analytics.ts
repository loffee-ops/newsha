import { useContext } from "react";

import { AnalyticsContext } from "@/app/analytics/context";

export function useAnalytics() {
    const analytics = useContext(AnalyticsContext);

    if (!analytics) {
        throw new Error("useAnalytics must be used within AnalyticsProvider");
    }

    return analytics;
}
