import { client } from "@/app/analytics/core";
import { AnalyticsContext } from "@/app/analytics/context";

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
    return <AnalyticsContext.Provider value={client()}>{children}</AnalyticsContext.Provider>;
}
