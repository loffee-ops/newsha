import type { ReactNode } from "react";

import { ErrorFallback } from "@design-system/ui/ErrorFallback";
import { ThemeProvider } from "@design-system/provider";
import { GlobalStyles } from "@design-system/styles";

import { AnalyticsProvider } from "@/app/providers/AnalyticsProvider";
import { ReduxProvider } from "@/app/providers/ReduxProvider";
import { RouterProvider } from "@/app/providers/RouterProvider";
import { ErrorBoundary } from "@/app/providers/ErrorBoundary";
import { ErrorMonitoringProvider } from "@/app/providers/ErrorMonitoringProvider";
import { ScrollManager } from "@/app/providers/ScrollManager";
import { AppBootstrap } from "@/app/providers/AppBootstrap";
import { AnalyticsRouterBoundary, PageLifecycleTracker } from "@/app/analytics/ui";

type AppProvidersProps = {
    children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
    return (
        <ReduxProvider>
            <ThemeProvider>
                <GlobalStyles />

                <ErrorBoundary fallback={<ErrorFallback />}>
                    <AnalyticsProvider>
                        <ErrorMonitoringProvider>
                            <RouterProvider>
                                <AppBootstrap>
                                    <AnalyticsRouterBoundary />
                                    <PageLifecycleTracker />
                                    <ScrollManager />
                                    {children}
                                </AppBootstrap>
                            </RouterProvider>
                        </ErrorMonitoringProvider>
                    </AnalyticsProvider>
                </ErrorBoundary>
            </ThemeProvider>
        </ReduxProvider>
    );
}
