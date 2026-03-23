export const COOPERATION_STATUSES = {
    New: "new",
    InProgress: "in_progress",
    Done: "done",
    Rejected: "rejected",
} as const;

export type CooperationStatus = (typeof COOPERATION_STATUSES)[keyof typeof COOPERATION_STATUSES];
