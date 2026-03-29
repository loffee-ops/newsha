import type { ProductDTO } from "@shared/contracts/product";

export type SearchResponseDTO = {
    items: readonly ProductDTO[];
};
