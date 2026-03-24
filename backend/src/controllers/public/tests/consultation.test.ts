import { afterEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

import { app } from "@/app";
import { ConsultationService } from "@/services/consultation.service";

describe("POST /api/consultations", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("creates consultation", async () => {
        const createSpy = vi.spyOn(ConsultationService.prototype, "create").mockResolvedValue({
            _id: "1",
            name: "Test Consultation",
            phone: "+380991112233",
            message: "Need advice",
            source: "site",
            status: "new",
        } as never);

        const response = await request(app).post("/api/consultations").send({
            name: "Test Consultation",
            phone: "+380991112233",
            message: "Need advice",
        });

        expect(response.status).toBe(201);
        expect(createSpy).toHaveBeenCalledWith({
            name: "Test Consultation",
            phone: "+380991112233",
            message: "Need advice",
            userId: undefined,
        });
    });

    it("returns 400 for invalid payload", async () => {
        const response = await request(app).post("/api/consultations").send({
            name: "",
        });

        expect(response.status).toBe(400);
    });
});
