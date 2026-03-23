export type AppErrorKind =
    | "NETWORK"
    | "TIMEOUT"
    | "HTTP"
    | "UNAUTHORIZED"
    | "FORBIDDEN"
    | "VALIDATION"
    | "BUSINESS"
    | "NOT_FOUND"
    | "UNKNOWN";

export interface AppErrorDTO {
    kind: AppErrorKind;
    message: string;
    status?: number;
    data?: unknown;
    source?: string;
}
