import { afterEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

import { asID } from "@shared/primitives";

import { app } from "@/app";
import { ReviewService } from "@/services/review.service";

describe("GET /api/reviews/product/:productId", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("returns review list by product id", async () => {
        const getApprovedByProductSpy = vi
            .spyOn(ReviewService.prototype, "getApprovedByProduct")
            .mockResolvedValue([] as never);

        const response = await request(app).get("/api/reviews/product/69b7364fcc3e587573709f89");

        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
        expect(getApprovedByProductSpy).toHaveBeenCalledWith(asID("69b7364fcc3e587573709f89"));
    });
});
