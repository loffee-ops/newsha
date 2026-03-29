import type { BannerRepository } from "@/entities/banner/repository/banner.repository";
import { HttpBannerRepository } from "@/entities/banner/repository/http-banner.repository";

export function createBannerService(): BannerRepository {
    return new HttpBannerRepository();
}
