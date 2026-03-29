import { afterEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

import { app } from "@/app";
import { ProductService } from "@/services/product.service";

describe("GET /api/products", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("returns product list", async () => {
        const getListSpy = vi.spyOn(ProductService.prototype, "getList").mockResolvedValue({
            data: [],
            meta: {
                page: 1,
                limit: 12,
                total: 0,
                totalPages: 1,
                hasNext: false,
                hasPrev: false,
            },
        });

        const response = await request(app).get("/api/products");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            data: [],
            meta: {
                page: 1,
                limit: 12,
                total: 0,
                totalPages: 1,
                hasNext: false,
                hasPrev: false,
            },
        });
        expect(getListSpy).toHaveBeenCalled();
    });

    it("returns 400 for empty search", async () => {
        const response = await request(app).get("/api/products/search?q=");

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            code: "BAD_REQUEST",
            kind: "VALIDATION",
            message: "Empty search",
        });
    });
});
