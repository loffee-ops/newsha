import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const EnvSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    PORT: z.coerce.number().int().positive().default(7183),
    API_BASE_PATH: z.string().min(1).default("/api"),
    CLIENT_URL: z.string().url().default("http://localhost:5173"),
    MONGO_URI: z.string().min(1, "MONGO_URI is required"),
    REDIS_HOST: z.string().min(1).default("127.0.0.1"),
    REDIS_PORT: z.coerce.number().int().positive().default(6379),
    JWT_SECRET: z.string().min(8, "JWT_SECRET must be at least 8 characters"),
    ACCESS_TOKEN_EXPIRES_IN: z.string().min(1).default("15m"),
    REFRESH_TOKEN_EXPIRES_IN: z.string().min(1).default("30d"),
    CLOUDINARY_CLOUD_NAME: z.string().optional(),
    CLOUDINARY_API_KEY: z.string().optional(),
    CLOUDINARY_API_SECRET: z.string().optional(),
    GOOGLE_CLIENT_ID: z.string().optional(),
    CORS_ORIGINS: z
        .string()
        .default(
            "http://localhost:5173,http://localhost:3000,https://newsha.com.ua,https://www.newsha.com.ua",
        ),
    ONEC_API_URL: z.string().url().optional(),
    ONEC_API_USERNAME: z.string().optional(),
    ONEC_API_PASSWORD: z.string().optional(),
    ONEC_API_TIMEOUT_MS: z.coerce.number().int().positive().default(15000),
});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
    console.error("Invalid environment variables");
    console.error(parsed.error.flatten().fieldErrors);
    process.exit(1);
}

export const env = parsed.data;
export const IS_PRODUCTION = env.NODE_ENV === "production";
export const IS_DEVELOPMENT = env.NODE_ENV === "development";
export const IS_TEST = env.NODE_ENV === "test";
export const PORT = env.PORT;
export const API_BASE_PATH = env.API_BASE_PATH;
export const CLIENT_URL = env.CLIENT_URL;
export const MONGO_URI = env.MONGO_URI;
export const REDIS_HOST = env.REDIS_HOST;
export const REDIS_PORT = env.REDIS_PORT;
export const JWT_SECRET = env.JWT_SECRET;
export const ACCESS_TOKEN_EXPIRES_IN = env.ACCESS_TOKEN_EXPIRES_IN;
export const REFRESH_TOKEN_EXPIRES_IN = env.REFRESH_TOKEN_EXPIRES_IN;
export const CLOUDINARY_CLOUD_NAME = env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = env.CLOUDINARY_API_SECRET;
export const GOOGLE_CLIENT_ID = env.GOOGLE_CLIENT_ID;
export const CORS_ORIGINS = env.CORS_ORIGINS.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
export const ONEC_API_URL = env.ONEC_API_URL;
export const ONEC_API_USERNAME = env.ONEC_API_USERNAME;
export const ONEC_API_PASSWORD = env.ONEC_API_PASSWORD;
export const ONEC_API_TIMEOUT_MS = env.ONEC_API_TIMEOUT_MS;
