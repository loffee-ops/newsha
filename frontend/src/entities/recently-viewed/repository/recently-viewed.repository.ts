import type { ProductDTO } from "@shared/contracts/product";
import type { ID } from "@shared/primitives";

export interface RecentlyViewedRepository {
    getRecentlyViewed(): Promise<readonly ProductDTO[]>;
    addRecentlyViewed(productId: ID): Promise<void>;
}
