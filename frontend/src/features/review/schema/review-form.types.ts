import type { ReviewRating } from "@shared/domain/review";

export type ReviewFormValues = {
    rating: ReviewRating | null;
    text: string;
    photos: File[];
};
