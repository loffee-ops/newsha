import { z } from "zod";

const FrontendEnvSchema = z.object({
    VITE_APP_NAME: z.string().min(1).default("Newsha Shop"),
    VITE_API_URL: z.string().min(1).default("/api"),
});

const parsed = FrontendEnvSchema.safeParse(import.meta.env);

if (!parsed.success) {
    console.error("Invalid frontend environment variables");
    console.error(parsed.error.flatten().fieldErrors);
    throw new Error("Invalid frontend environment variables");
}

export const ENV = {
    APP_NAME: parsed.data.VITE_APP_NAME,
    API_URL: parsed.data.VITE_API_URL,
    MODE: import.meta.env.MODE,
    IS_DEV: import.meta.env.DEV,
    IS_PROD: import.meta.env.PROD,
} as const;
