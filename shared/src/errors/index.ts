export * from "./auth.errors";
export * from "./product.errors";
export * from "./order.errors";
export * from "./user.errors";
export * from "./banner.errors";
export * from "./consultation.errors";
export * from "./cooperation.errors";
export * from "./analytics.errors";
export * from "./common.errors";

import type { AuthErrorCode } from "./auth.errors";
import type { ProductErrorCode } from "./product.errors";
import type { OrderErrorCode } from "./order.errors";
import type { UserErrorCode } from "./user.errors";
import type { BannerErrorCode } from "./banner.errors";
import type { ConsultationErrorCode } from "./consultation.errors";
import type { CooperationErrorCode } from "./cooperation.errors";
import type { AnalyticsErrorCode } from "./analytics.errors";
import type { CommonErrorCode } from "./common.errors";

export type ErrorCode =
    | AuthErrorCode
    | ProductErrorCode
    | OrderErrorCode
    | UserErrorCode
    | BannerErrorCode
    | ConsultationErrorCode
    | CooperationErrorCode
    | AnalyticsErrorCode
    | CommonErrorCode;
