import mongoose from "mongoose";
import request from "supertest";

import { app } from "@/app";

describe("GET /api/health", () => {
    it("returns 200 when database is up", async () => {
        const originalReadyState = mongoose.connection.readyState;

        Object.defineProperty(mongoose.connection, "readyState", {
            configurable: true,
            get: () => 1,
        });

        const response = await request(app).get("/api/health");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                status: "ok",
                db: "up",
            }),
        );
        expect(typeof response.body.uptime).toBe("number");
        expect(typeof response.body.timestamp).toBe("string");

        Object.defineProperty(mongoose.connection, "readyState", {
            configurable: true,
            get: () => originalReadyState,
        });
    });
});
