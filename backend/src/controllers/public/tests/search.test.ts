import { afterEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

import { app } from "@/app";
import { SearchService } from "@/services/search.service";

describe("GET /api/search", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("returns 400 for empty query", async () => {
        const response = await request(app).get("/api/search");

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            code: "BAD_REQUEST",
            kind: "VALIDATION",
            message: "Query is required",
        });
    });

    it("returns items for valid query", async () => {
        const searchSpy = vi.spyOn(SearchService.prototype, "searchProducts").mockResolvedValue([]);

        const response = await request(app).get("/api/search?q=test");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ items: [] });
        expect(searchSpy).toHaveBeenCalledWith({
            query: "test",
            limit: undefined,
        });
    });
});
