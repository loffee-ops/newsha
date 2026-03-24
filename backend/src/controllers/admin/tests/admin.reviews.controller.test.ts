import { afterEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

vi.mock("@/middleware/auth.middleware", () => ({
    requireAuth: (
        req: import("express").Request,
        _res: import("express").Response,
        next: import("express").NextFunction,
    ) => {
        req.userId = "69b2e3124ef8843e772a0f3f";
        req.userRole = "admin";
        next();
    },
}));

vi.mock("@/middleware/admin.middleware", () => ({
    requireAdmin: (
        _req: import("express").Request,
        _res: import("express").Response,
        next: import("express").NextFunction,
    ) => {
        next();
    },
}));

vi.mock("@/validation/review.validation", () => ({
    validateReviewId: vi.fn(),
    validateReviewStatus: vi.fn(),
}));

import { app } from "@/app";
import { ReviewService } from "@/services/review.service";
import { validateReviewId, validateReviewStatus } from "@/validation/review.validation";

describe("admin reviews controller", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("GET /api/admin/reviews returns paginated reviews", async () => {
        const getAdminListSpy = vi
            .spyOn(ReviewService.prototype, "getAdminList")
            .mockResolvedValue({
                items: [],
                page: 1,
                limit: 20,
                total: 0,
                pages: 1,
            } as never);

        const response = await request(app).get("/api/admin/reviews");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            items: [],
            page: 1,
            limit: 20,
            total: 0,
            pages: 1,
        });
        expect(getAdminListSpy).toHaveBeenCalled();
    });

    it("GET /api/admin/reviews/:id returns one review", async () => {
        vi.mocked(validateReviewId).mockReturnValue("69b2e3124ef8843e772a0f3f" as never);

        const getByIdSpy = vi.spyOn(ReviewService.prototype, "getById").mockResolvedValue({
            _id: "69b2e3124ef8843e772a0f3f",
            productId: "69b7364fcc3e587573709f89",
            userId: "69b7364fcc3e587573709f88",
            userName: "Test User",
            rating: 5,
            text: "Great product",
            photos: [],
            status: "approved",
            createdAt: new Date("2026-03-15T00:00:00.000Z"),
            updatedAt: new Date("2026-03-15T00:00:00.000Z"),
        } as never);

        const response = await request(app).get("/api/admin/reviews/69b2e3124ef8843e772a0f3f");

        expect(response.status).toBe(200);
        expect(validateReviewId).toHaveBeenCalled();
        expect(getByIdSpy).toHaveBeenCalledWith("69b2e3124ef8843e772a0f3f");
    });

    it("PATCH /api/admin/reviews/:id/status updates review status", async () => {
        vi.mocked(validateReviewId).mockReturnValue("69b2e3124ef8843e772a0f3f" as never);
        vi.mocked(validateReviewStatus).mockReturnValue("approved" as never);

        const updateStatusSpy = vi
            .spyOn(ReviewService.prototype, "updateStatus")
            .mockResolvedValue({
                _id: "69b2e3124ef8843e772a0f3f",
                productId: "69b7364fcc3e587573709f89",
                userId: "69b7364fcc3e587573709f88",
                userName: "Test User",
                rating: 5,
                text: "Great product",
                photos: [],
                status: "approved",
                createdAt: new Date("2026-03-15T00:00:00.000Z"),
                updatedAt: new Date("2026-03-15T00:00:00.000Z"),
            } as never);

        const response = await request(app)
            .patch("/api/admin/reviews/69b2e3124ef8843e772a0f3f/status")
            .send({ status: "approved" });

        expect(response.status).toBe(200);
        expect(validateReviewId).toHaveBeenCalled();
        expect(validateReviewStatus).toHaveBeenCalledWith("approved");
        expect(updateStatusSpy).toHaveBeenCalledWith("69b2e3124ef8843e772a0f3f", "approved");
    });

    it("DELETE /api/admin/reviews/:id returns ok", async () => {
        vi.mocked(validateReviewId).mockReturnValue("69b2e3124ef8843e772a0f3f" as never);

        const deleteSpy = vi
            .spyOn(ReviewService.prototype, "delete")
            .mockResolvedValue(undefined as never);

        const response = await request(app).delete("/api/admin/reviews/69b2e3124ef8843e772a0f3f");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ ok: true });
        expect(validateReviewId).toHaveBeenCalled();
        expect(deleteSpy).toHaveBeenCalledWith("69b2e3124ef8843e772a0f3f");
    });
});
