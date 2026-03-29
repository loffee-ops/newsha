import type { BannerDTO } from "@shared/contracts/banner";
import type { BannerPlacement } from "@shared/domain/banner";

export interface BannerRepository {
    getByPlacement(placement: BannerPlacement): Promise<readonly BannerDTO[]>;
}
