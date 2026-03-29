import { REVIEW_CONFIG } from "@/features/review/config";
import type { ReviewFormValues } from "./review-form.types";

import type { FormSchema } from "@/shared/lib/forms";

export const reviewForm: FormSchema<ReviewFormValues> = {
    title: REVIEW_CONFIG.FORM_TITLE,
    submitLabel: REVIEW_CONFIG.SUBMIT_LABEL,
    validateBeforeSubmit: true,

    initialValues: {
        rating: null,
        text: "",
        photos: [],
    },

    fields: [
        {
            name: "rating",
            label: REVIEW_CONFIG.RATING_LABEL,
            type: "radio",
            required: true,
            options: REVIEW_CONFIG.RATING_OPTIONS,
        },
        {
            name: "text",
            label: REVIEW_CONFIG.TEXT_LABEL,
            type: "textarea",
            placeholder: REVIEW_CONFIG.TEXT_PLACEHOLDER,
            minLength: REVIEW_CONFIG.VALIDATION.TEXT_MIN,
            maxLength: REVIEW_CONFIG.VALIDATION.TEXT_MAX,
        },
        {
            name: "photos",
            label: REVIEW_CONFIG.PHOTOS_LABEL,
            type: "file",
            multiple: true,
        },
    ],
};
