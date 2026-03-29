import type {
    AdminBannerListResponse,
    AdminBannerResponse,
    DeleteBannerPayload,
    UpdateBannerPayload,
    UploadBannerPayload,
} from "@/entities/banner/types";

export interface AdminBannerRepository {
    getAll(params?: { page?: number; limit?: number }): Promise<AdminBannerListResponse>;
    upload(payload: UploadBannerPayload): Promise<AdminBannerResponse>;
    update(payload: UpdateBannerPayload): Promise<AdminBannerResponse>;
    remove(payload: DeleteBannerPayload): Promise<void>;
}
