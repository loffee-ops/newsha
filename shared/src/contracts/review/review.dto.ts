import type { ID } from "@shared/primitives";

export type CreateReviewDTO = {
    productId: ID;
    userName: string;
    rating: number;
    text?: string;
    photos?: string[];
};
