import { afterEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

import { app } from "@/app";
import { CooperationService } from "@/services/cooperation.service";

describe("POST /api/cooperation", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("creates cooperation lead", async () => {
        const createSpy = vi.spyOn(CooperationService.prototype, "create").mockResolvedValue({
            _id: "1",
            name: "Test Cooperation",
            phone: "+380991112233",
            city: "Uzhhorod",
            message: "Test message",
            status: "new",
        } as never);

        const response = await request(app).post("/api/cooperation").send({
            name: "Test Cooperation",
            phone: "+380991112233",
            city: "Uzhhorod",
            message: "Test message",
        });

        expect(response.status).toBe(201);
        expect(createSpy).toHaveBeenCalledWith({
            name: "Test Cooperation",
            phone: "+380991112233",
            city: "Uzhhorod",
            message: "Test message",
        });
    });

    it("returns 400 for invalid payload", async () => {
        const response = await request(app).post("/api/cooperation").send({
            name: "",
        });

        expect(response.status).toBe(400);
    });
});
