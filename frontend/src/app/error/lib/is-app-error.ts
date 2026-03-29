import type { AppErrorDTO } from "@shared/contracts/error";

export function isAppError(value: unknown): value is AppErrorDTO {
    return (
        typeof value === "object" &&
        value !== null &&
        "kind" in value &&
        "message" in value &&
        typeof (value as { kind?: unknown }).kind === "string" &&
        typeof (value as { message?: unknown }).message === "string"
    );
}
