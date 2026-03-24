import { afterEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

import { app } from "@/app";
import { ProductService } from "@/services/product.service";

describe("GET /api/products", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("returns product list", async () => {
        const getListSpy = vi.spyOn(ProductService.prototype, "getList").mockResolvedValue([]);

        const response = await request(app).get("/api/products");

        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
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
