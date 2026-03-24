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

vi.mock("@/services/admin.banner.service", () => ({
    getAllBannersAdmin: vi.fn(),
    uploadBannerAdmin: vi.fn(),
    updateBannerAdmin: vi.fn(),
    deleteBannerAdmin: vi.fn(),
}));

vi.mock("@/validation/banner.validation", () => ({
    validateUploadBanner: vi.fn(),
    validateUpdateBanner: vi.fn(),
    validateBannerId: vi.fn(),
}));

import { app } from "@/app";
import {
    getAllBannersAdmin,
    uploadBannerAdmin,
    updateBannerAdmin,
    deleteBannerAdmin,
} from "@/services/admin.banner.service";
import {
    validateUploadBanner,
    validateUpdateBanner,
    validateBannerId,
} from "@/validation/banner.validation";

describe("admin banner controller", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it("GET /api/admin/banners returns paginated banners", async () => {
        vi.mocked(getAllBannersAdmin).mockResolvedValue({
            items: [],
            page: 1,
            limit: 20,
            total: 0,
            pages: 1,
        } as never);

        const response = await request(app).get("/api/admin/banners");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            items: [],
            page: 1,
            limit: 20,
            total: 0,
            pages: 1,
        });
        expect(getAllBannersAdmin).toHaveBeenCalledTimes(1);
    });

    it("POST /api/admin/banners uploads banner", async () => {
        vi.mocked(validateUploadBanner).mockReturnValue({
            placement: "home-hero",
            variant: "hero",
            title: "Main banner",
        } as never);

        vi.mocked(uploadBannerAdmin).mockResolvedValue({
            id: "banner-1",
            placement: "home-hero",
            variant: "hero",
            image: "https://cdn.example.com/banner.jpg",
            title: "Main banner",
            isActive: true,
            order: 0,
        } as never);

        const response = await request(app)
            .post("/api/admin/banners")
            .field("placement", "home-hero")
            .field("variant", "hero")
            .field("title", "Main banner")
            .attach("file", Buffer.from("fake-image"), "banner.jpg");

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            id: "banner-1",
            placement: "home-hero",
            variant: "hero",
            image: "https://cdn.example.com/banner.jpg",
            title: "Main banner",
            isActive: true,
            order: 0,
        });

        expect(validateUploadBanner).toHaveBeenCalledTimes(1);
        expect(uploadBannerAdmin).toHaveBeenCalledTimes(1);
    });

    it("PATCH /api/admin/banners/:id updates banner", async () => {
        vi.mocked(validateUpdateBanner).mockReturnValue({
            id: "banner-1",
            title: "Updated banner",
        } as never);

        vi.mocked(updateBannerAdmin).mockResolvedValue({
            id: "banner-1",
            placement: "home-hero",
            variant: "hero",
            image: "https://cdn.example.com/banner.jpg",
            title: "Updated banner",
            isActive: true,
            order: 0,
        } as never);

        const response = await request(app)
            .patch("/api/admin/banners/banner-1")
            .send({ title: "Updated banner" });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: "banner-1",
            placement: "home-hero",
            variant: "hero",
            image: "https://cdn.example.com/banner.jpg",
            title: "Updated banner",
            isActive: true,
            order: 0,
        });

        expect(validateUpdateBanner).toHaveBeenCalledTimes(1);
        expect(updateBannerAdmin).toHaveBeenCalledWith({
            id: "banner-1",
            title: "Updated banner",
        });
    });

    it("DELETE /api/admin/banners/:id deletes banner", async () => {
        vi.mocked(validateBannerId).mockReturnValue("banner-1" as never);
        vi.mocked(deleteBannerAdmin).mockResolvedValue(undefined as never);

        const response = await request(app).delete("/api/admin/banners/banner-1");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ ok: true });

        expect(validateBannerId).toHaveBeenCalledTimes(1);
        expect(deleteBannerAdmin).toHaveBeenCalledWith("banner-1");
    });
});
