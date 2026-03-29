import type { ProductDTO } from "@shared/contracts/product";
import type { ID } from "@shared/primitives";

import { recentlyViewedApi } from "../api/recently-viewed.api";
import type { RecentlyViewedRepository } from "./recently-viewed.repository";

export class HttpRecentlyViewedRepository implements RecentlyViewedRepository {
    async getRecentlyViewed(): Promise<readonly ProductDTO[]> {
        const response = await recentlyViewedApi.getRecentlyViewed();
        return response.items;
    }

    async addRecentlyViewed(productId: ID): Promise<void> {
        await recentlyViewedApi.addRecentlyViewed(productId);
    }
}
