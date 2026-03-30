import axios, { type AxiosInstance } from "axios";

import { ONEC_API_PASSWORD, ONEC_API_TIMEOUT_MS, ONEC_API_URL, ONEC_API_USERNAME } from "@/config";

import { logger } from "@/infrastructure/logger";

import type {
    OneCCategoryItem,
    OneCListResponse,
    OneCProductItem,
} from "@/integrations/onec/types";

type CursorParams = {
    cursor?: string;
    updatedAfter?: string;
    limit?: number;
};

function ensureOneCConfig(): void {
    if (!ONEC_API_URL) {
        throw new Error("ONEC_API_URL is not configured");
    }
}

export class OneCClient {
    private readonly http: AxiosInstance;

    constructor() {
        ensureOneCConfig();

        this.http = axios.create({
            baseURL: ONEC_API_URL,
            timeout: ONEC_API_TIMEOUT_MS,
            ...(ONEC_API_USERNAME && ONEC_API_PASSWORD
                ? {
                      auth: {
                          username: ONEC_API_USERNAME,
                          password: ONEC_API_PASSWORD,
                      },
                  }
                : {}),
        });
    }

    async getCategories(params?: CursorParams): Promise<OneCListResponse<OneCCategoryItem>> {
        logger.info({ params }, "1C getCategories request started");

        const { data } = await this.http.get<OneCListResponse<OneCCategoryItem>>("/categories", {
            params,
        });

        logger.info(
            {
                count: Array.isArray(data.items) ? data.items.length : 0,
                nextCursor: data.nextCursor,
            },
            "1C getCategories request completed",
        );

        return data;
    }

    async getProducts(params?: CursorParams): Promise<OneCListResponse<OneCProductItem>> {
        logger.info({ params }, "1C getProducts request started");

        const { data } = await this.http.get<OneCListResponse<OneCProductItem>>("/products", {
            params,
        });

        logger.info(
            {
                count: Array.isArray(data.items) ? data.items.length : 0,
                nextCursor: data.nextCursor,
            },
            "1C getProducts request completed",
        );

        return data;
    }
}
