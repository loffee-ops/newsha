import type { AdminBannerRepository } from "@/entities/banner/repository/admin-banner.repository";
import { HttpAdminBannerRepository } from "@/entities/banner/repository/http-admin-banner.repository";

export function createAdminBannerService(): AdminBannerRepository {
    return new HttpAdminBannerRepository();
}
