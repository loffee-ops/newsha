import type { BannerDTO } from "@shared/contracts/banner";
import type { BannerPlacement } from "@shared/domain/banner";

import { bannerApi } from "@/entities/banner/api";

import type { BannerRepository } from "./banner.repository";

export class HttpBannerRepository implements BannerRepository {
    getByPlacement(placement: BannerPlacement): Promise<readonly BannerDTO[]> {
        return bannerApi.getByPlacement(placement);
    }
}
