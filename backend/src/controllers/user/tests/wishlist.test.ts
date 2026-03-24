import request from "supertest";

import { app } from "@/app";

describe("GET /api/wishlist", () => {
    it("returns 401 json without auth", async () => {
        const response = await request(app).get("/api/wishlist");

        expect(response.status).toBe(401);
        expect(response.body).toEqual({
            code: "AUTH_UNAUTHORIZED",
            kind: "UNAUTHORIZED",
            message: "Unauthorized",
        });
    });
});
