import { afterEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

import { app } from "@/app";
import * as bannerService from "@/services/banner.service";

describe("GET /api/banners", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("returns banner list", async () => {
        const findActiveBannersByPlacementSpy = vi
            .spyOn(bannerService, "findActiveBannersByPlacement")
            .mockResolvedValue([]);

        const response = await request(app).get("/api/banners?placement=home-hero");

        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
        expect(findActiveBannersByPlacementSpy).toHaveBeenCalledWith("home-hero");
    });

    it("returns 400 for missing placement", async () => {
        const response = await request(app).get("/api/banners");

        expect(response.status).toBe(400);
    });
});
