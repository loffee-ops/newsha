export const REVIEW_CONFIG = {
    FORM_TITLE: "Залишити відгук",
    SUBMIT_LABEL: "Надіслати",
    RATING_LABEL: "Рейтинг",
    TEXT_LABEL: "Ваш відгук",
    TEXT_PLACEHOLDER: "Розкажіть про ваш досвід",
    PHOTOS_LABEL: "Фото (необов'язково)",

    RATING_OPTIONS: [
        { value: 1, label: "1" },
        { value: 2, label: "2" },
        { value: 3, label: "3" },
        { value: 4, label: "4" },
        { value: 5, label: "5" },
    ],

    VALIDATION: {
        TEXT_MIN: 10,
        TEXT_MAX: 2000,
    },
} as const;
