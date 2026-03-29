export const CHECKOUT_FORM_TEXT = {
    TITLE: "Оформлення замовлення",
    SUBMIT_LABEL: "Підтвердити замовлення",

    FIELDS: {
        FIRST_NAME: "Ім'я",
        LAST_NAME: "Прізвище",
        MIDDLE_NAME: "По батькові",

        PHONE: {
            LABEL: "Телефон",
            PLACEHOLDER: "+380...",
            ERROR: "Введіть номер у форматі +380XXXXXXXXX",
        },

        DELIVERY_METHOD: {
            LABEL: "Спосіб доставки",
            OPTIONS: {
                WAREHOUSE: "Відділення НП",
                POSTOMAT: "Поштомат НП",
                COURIER: "Кур'єр НП",
            },
        },

        PAYMENT_METHOD: {
            LABEL: "Спосіб оплати",
            OPTIONS: {
                CASH: "Оплата при отриманні",
                ONLINE: "Онлайн оплата",
            },
        },

        CITY: {
            LABEL: "Місто",
            PLACEHOLDER: "Наприклад: Київ",
        },

        WAREHOUSE: {
            LABEL: "Відділення",
            PLACEHOLDER: "№ відділення",
        },

        POSTOMAT: {
            LABEL: "Поштомат",
            PLACEHOLDER: "№ поштомата",
        },

        ADDRESS: {
            LABEL: "Адреса",
            PLACEHOLDER: "Адреса для кур'єра",
        },

        COMMENT: {
            LABEL: "Коментар до замовлення",
            PLACEHOLDER: "За потреби залиште коментар",
        },
    },
} as const;
