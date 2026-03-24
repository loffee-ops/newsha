import request from "supertest";

import { app } from "@/app";

describe("GET /api/cart", () => {
    it("returns 401 json without auth", async () => {
        const response = await request(app).get("/api/cart");

        expect(response.status).toBe(401);
        expect(response.body).toEqual({
            code: "AUTH_UNAUTHORIZED",
            kind: "UNAUTHORIZED",
            message: "Unauthorized",
        });
    });
});
