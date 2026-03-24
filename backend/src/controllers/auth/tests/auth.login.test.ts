import { afterEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

import { asID } from "@shared/primitives";

vi.mock("@/services/auth.service", () => ({
    login: vi.fn(),
    register: vi.fn(),
    getUserById: vi.fn(),
}));

import { app } from "@/app";
import { login } from "@/services/auth.service";

describe("POST /api/auth/login", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it("returns user and sets auth + refresh cookies", async () => {
        vi.mocked(login).mockResolvedValue({
            user: {
                id: asID("69b7364fcc3e587573709f89"),
                name: "Test User",
                email: "testuser_backend_check@example.com",
                role: "user",
            },
            accessToken: "test-access-token",
            refreshToken: "test-refresh-token",
        });

        const response = await request(app).post("/api/auth/login").send({
            email: "testuser_backend_check@example.com",
            password: "StrongPass123",
        });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            user: {
                id: "69b7364fcc3e587573709f89",
                name: "Test User",
                email: "testuser_backend_check@example.com",
                role: "user",
            },
        });

        const rawSetCookie = response.headers["set-cookie"];
        const setCookie = Array.isArray(rawSetCookie)
            ? rawSetCookie
            : rawSetCookie
              ? [rawSetCookie]
              : [];

        expect(setCookie.length).toBeGreaterThan(0);

        expect(setCookie.some((cookie) => cookie.includes("auth_token=test-access-token"))).toBe(
            true,
        );

        expect(
            setCookie.some((cookie) => cookie.includes("refresh_token=test-refresh-token")),
        ).toBe(true);
    });
});
