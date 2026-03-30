import type {
    AdminBannerListResponse,
    AdminBannerResponse,
    DeleteBannerPayload,
    UpdateBannerPayload,
    UploadBannerPayload,
} from "@/entities/banner/types";

import { adminBannerApi } from "@/entities/banner/api";

import type { AdminBannerRepository } from "./admin-banner.repository";

export class HttpAdminBannerRepository implements AdminBannerRepository {
    getAll(params?: { page?: number; limit?: number }): Promise<AdminBannerListResponse> {
        return adminBannerApi.getAll(params);
    }

    upload(payload: UploadBannerPayload): Promise<AdminBannerResponse> {
        return adminBannerApi.upload(payload);
    }

    update(payload: UpdateBannerPayload): Promise<AdminBannerResponse> {
        return adminBannerApi.update(payload);
    }

    async remove(payload: DeleteBannerPayload): Promise<void> {
        await adminBannerApi.remove(payload);
    }
}
