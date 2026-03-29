import request from "supertest";

import { app } from "@/app";

describe("GET /api/users/me", () => {
    it("returns 401 json without auth", async () => {
        const response = await request(app).get("/api/users/me");

        expect(response.status).toBe(401);
        expect(response.body).toEqual({
            code: "AUTH_UNAUTHORIZED",
            kind: "UNAUTHORIZED",
            message: "Unauthorized",
        });
    });
});
