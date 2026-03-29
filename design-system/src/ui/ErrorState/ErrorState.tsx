import { ErrorView } from "@ds/ui/ErrorView";

import { ERROR_STATE_TEXT } from "./texts";
import type { ErrorStateProps } from "./types";

export function ErrorState({
    title = ERROR_STATE_TEXT.title,
    description = ERROR_STATE_TEXT.description,
    onRetry,
    className,
}: ErrorStateProps) {
    return (
        <ErrorView
            title={title}
            description={description}
            {...(className ? { className } : {})}
            {...(onRetry
                ? {
                      actionLabel: ERROR_STATE_TEXT.retry,
                      onAction: onRetry,
                  }
                : {})}
        />
    );
}
