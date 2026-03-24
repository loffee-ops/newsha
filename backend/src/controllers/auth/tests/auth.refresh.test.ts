import { afterEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

import { asID } from "@shared/primitives";
import { AuthErrors } from "@/errors";

vi.mock("@/services/auth.service", () => ({
    login: vi.fn(),
    register: vi.fn(),
    getUserById: vi.fn(),
    refreshSession: vi.fn(),
    logoutCurrentSession: vi.fn(),
    logoutAllSessions: vi.fn(),
}));

import { app } from "@/app";
import { refreshSession } from "@/services/auth.service";

describe("POST /api/auth/refresh", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it("returns user and sets auth + refresh cookies", async () => {
        vi.mocked(refreshSession).mockResolvedValue({
            user: {
                id: asID("69b7364fcc3e587573709f89"),
                name: "Test User",
                email: "testuser_backend_check@example.com",
                role: "user",
            },
            accessToken: "new-access-token",
            refreshToken: "new-refresh-token",
        });

        const response = await request(app)
            .post("/api/auth/refresh")
            .set("Cookie", ["refresh_token=test-refresh-token"]);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            user: {
                id: "69b7364fcc3e587573709f89",
                name: "Test User",
                email: "testuser_backend_check@example.com",
                role: "user",
            },
        });

        expect(refreshSession).toHaveBeenCalledWith("test-refresh-token", expect.any(Object));

        const rawSetCookie = response.headers["set-cookie"];
        const setCookie = Array.isArray(rawSetCookie)
            ? rawSetCookie
            : rawSetCookie
              ? [rawSetCookie]
              : [];

        expect(setCookie.some((cookie) => cookie.includes("auth_token=new-access-token"))).toBe(
            true,
        );
        expect(setCookie.some((cookie) => cookie.includes("refresh_token=new-refresh-token"))).toBe(
            true,
        );
    });

    it("returns 401 when refresh cookie is missing", async () => {
        const response = await request(app).post("/api/auth/refresh");

        expect(response.status).toBe(401);
        expect(response.body).toEqual({
            code: "AUTH_REFRESH_TOKEN_REQUIRED",
            kind: "UNAUTHORIZED",
            message: "Refresh token is required",
        });
    });

    it("returns 401 when refreshSession throws invalid refresh token", async () => {
        vi.mocked(refreshSession).mockRejectedValue(AuthErrors.invalidRefreshToken());

        const response = await request(app)
            .post("/api/auth/refresh")
            .set("Cookie", ["refresh_token=broken-refresh-token"]);

        expect(response.status).toBe(401);
        expect(response.body).toEqual({
            code: "AUTH_INVALID_REFRESH_TOKEN",
            kind: "UNAUTHORIZED",
            message: "Invalid refresh token",
        });
    });
});
