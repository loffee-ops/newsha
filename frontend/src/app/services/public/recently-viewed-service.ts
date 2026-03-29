import type { RecentlyViewedRepository } from "@/entities/recently-viewed/repository/recently-viewed.repository";
import { HttpRecentlyViewedRepository } from "@/entities/recently-viewed/repository/http-recently-viewed.repository";

export function createRecentlyViewedService(): RecentlyViewedRepository {
    return new HttpRecentlyViewedRepository();
}
