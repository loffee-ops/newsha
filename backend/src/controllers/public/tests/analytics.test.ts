import { afterEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

import { app } from "@/app";
import { AnalyticsService } from "@/services/analytics.service";

describe("POST /api/analytics", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("tracks valid event", async () => {
        const trackSpy = vi.spyOn(AnalyticsService.prototype, "track").mockResolvedValue(undefined);

        const response = await request(app).post("/api/analytics").send({
            type: "page_view",
            path: "/",
        });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ ok: true });
        expect(trackSpy).toHaveBeenCalledWith(
            {
                type: "page_view",
                path: "/",
            },
            {
                userId: undefined,
                sessionId: undefined,
            },
        );
    });

    it("returns 400 for invalid event", async () => {
        const response = await request(app).post("/api/analytics").send({});

        expect(response.status).toBe(400);
    });
});
