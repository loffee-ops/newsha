import type { BannerDTO } from "@shared/contracts/banner";
import type { BannerPlacement } from "@shared/domain/banner";

import { http } from "@/app/http";

export const bannerApi = {
    async getByPlacement(placement: BannerPlacement): Promise<readonly BannerDTO[]> {
        const response = await http<BannerDTO[]>({
            url: "/banners",
            method: "GET",
            query: {
                placement,
            },
        });

        return response.data;
    },
};
