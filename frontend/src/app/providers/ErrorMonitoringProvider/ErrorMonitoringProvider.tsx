import type { ReactNode } from "react";
import { useEffect } from "react";

import { useAnalytics } from "@/app/analytics/hooks";
import { logger } from "@/app/error/model";

import { showToast } from "@design-system/ui/Toast/model";

type Props = {
    children: ReactNode;
};

export function ErrorMonitoringProvider({ children }: Props) {
    const analytics = useAnalytics();

    useEffect(() => {
        return logger.subscribe((error) => {
            const message = error instanceof Error ? error.message : "Unexpected error";

            showToast("error", message);
            analytics.track({ type: "error", error });
        });
    }, [analytics]);

    return <>{children}</>;
}
