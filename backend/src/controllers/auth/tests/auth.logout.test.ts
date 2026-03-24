import { afterEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

vi.mock("@/middleware/auth.middleware", async () => {
    const actual = await vi.importActual<typeof import("@/middleware/auth.middleware")>(
        "@/middleware/auth.middleware",
    );

    return {
        ...actual,
        requireAuth: (
            req: import("express").Request,
            _res: import("express").Response,
            next: import("express").NextFunction,
        ) => {
            req.userId = "69b74bbe8ad460dfdef85479";
            req.userRole = "admin";
            req.sessionId = "69b7ebd25ea6550cd0a50c88";
            next();
        },
    };
});

vi.mock("@/services/auth.service", () => ({
    login: vi.fn(),
    register: vi.fn(),
    getUserById: vi.fn(),
    refreshSession: vi.fn(),
    logoutCurrentSession: vi.fn(),
    logoutAllSessions: vi.fn(),
}));

import { app } from "@/app";
import { logoutCurrentSession } from "@/services/auth.service";

describe("POST /api/auth/logout", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it("returns ok, clears auth + refresh cookies and revokes current session", async () => {
        const response = await request(app).post("/api/auth/logout");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ ok: true });

        expect(logoutCurrentSession).toHaveBeenCalledWith("69b7ebd25ea6550cd0a50c88");

        const rawSetCookie = response.headers["set-cookie"];
        const setCookie = Array.isArray(rawSetCookie)
            ? rawSetCookie
            : rawSetCookie
              ? [rawSetCookie]
              : [];

        expect(setCookie.some((cookie) => cookie.includes("auth_token="))).toBe(true);
        expect(setCookie.some((cookie) => cookie.includes("refresh_token="))).toBe(true);
    });
});
