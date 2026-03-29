import { ErrorView } from "../ErrorView";
import { ERROR_FALLBACK_TEXT } from "./config";

export function ErrorFallback() {
    return (
        <ErrorView
            title={ERROR_FALLBACK_TEXT.title}
            description={ERROR_FALLBACK_TEXT.description}
            actionLabel={ERROR_FALLBACK_TEXT.button}
            onAction={() => window.location.reload()}
        />
    );
}
