export type HealthOverallStatus = "ok" | "error";
export type DbStatus = "up" | "connecting" | "disconnecting" | "down";
export type RedisStatus = "up" | "connecting" | "down";

export type HealthResponse = {
    status: HealthOverallStatus;
    db: DbStatus;
    redis: RedisStatus;
    uptime: number;
    timestamp: string;
};
