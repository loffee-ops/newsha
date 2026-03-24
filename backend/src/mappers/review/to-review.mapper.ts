import { asID, asISODate } from "@shared/primitives";
import type { Review, ReviewRating } from "@shared/domain/review";

import type { ReviewDoc } from "@/models/review.model";

export function toReview(doc: ReviewDoc): Review {
    return {
        id: asID(doc._id.toString()),
        productId: asID(doc.productId.toString()),
        userId: asID(doc.userId.toString()),
        userName: doc.userName,
        rating: doc.rating as ReviewRating,
        text: doc.text ?? undefined,
        photos: doc.photos?.length ? doc.photos : undefined,
        status: doc.status,
        createdAt: asISODate(doc.createdAt.toISOString()),
        updatedAt: asISODate(doc.updatedAt.toISOString()),
    };
}

export function toReviews(docs: readonly ReviewDoc[]): Review[] {
    return docs.map(toReview);
}
