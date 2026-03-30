import { HEALTH_STATUS, DB_STATUS, REDIS_STATUS } from "@shared/domain/health";

export type DbStatus = (typeof DB_STATUS)[keyof typeof DB_STATUS];
export type RedisStatus = (typeof REDIS_STATUS)[keyof typeof REDIS_STATUS];
export type HealthStatus = (typeof HEALTH_STATUS)[keyof typeof HEALTH_STATUS];

export type HealthResponse = {
    status: HealthStatus;
    db: DbStatus;
    redis: RedisStatus;
    uptime: number;
    timestamp: string;
};
