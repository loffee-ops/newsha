export type EmailMessageDTO = {
    to: string;
    subject: string;
    html: string;
    from?: string;
};

export type SmsMessageDTO = {
    to: string;
    text: string;
    from?: string;
};
