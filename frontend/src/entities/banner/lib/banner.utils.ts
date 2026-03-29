import type { BannerDTO } from "@shared/contracts/banner";

export function hasBannerLink(banner: BannerDTO): boolean {
    return !!banner.link?.trim();
}

export function getBannerTitle(banner: BannerDTO): string {
    return banner.title?.trim() || "";
}
