import { afterEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

vi.mock("@/middleware/auth.middleware", () => ({
    requireAuth: (
        req: import("express").Request,
        _res: import("express").Response,
        next: import("express").NextFunction,
    ) => {
        req.userId = "69b2e3124ef8843e772a0f3f";
        req.userRole = "admin";
        next();
    },
}));

vi.mock("@/middleware/admin.middleware", () => ({
    requireAdmin: (
        _req: import("express").Request,
        _res: import("express").Response,
        next: import("express").NextFunction,
    ) => {
        next();
    },
}));

vi.mock("@/validation/order.validation", () => ({
    validateAdminOrderFilters: vi.fn(),
    validateOrderId: vi.fn(),
    validateSetOrderStatus: vi.fn(),
}));

import { app } from "@/app";
import { OrderService } from "@/services/order.service";
import {
    validateAdminOrderFilters,
    validateOrderId,
    validateSetOrderStatus,
} from "@/validation/order.validation";

describe("admin order controller", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("GET /api/admin/orders returns paginated orders", async () => {
        vi.mocked(validateAdminOrderFilters).mockReturnValue({} as never);

        const getAdminOrdersPaginatedSpy = vi
            .spyOn(OrderService.prototype, "getAdminOrdersPaginated")
            .mockResolvedValue({
                items: [],
                page: 1,
                limit: 20,
                total: 0,
                pages: 1,
            } as never);

        const response = await request(app).get("/api/admin/orders");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            items: [],
            page: 1,
            limit: 20,
            total: 0,
            pages: 1,
        });
        expect(validateAdminOrderFilters).toHaveBeenCalled();
        expect(getAdminOrdersPaginatedSpy).toHaveBeenCalled();
    });

    it("GET /api/admin/orders/:id returns one order", async () => {
        vi.mocked(validateOrderId).mockReturnValue("69b2e3124ef8843e772a0f3f" as never);

        const getByIdSpy = vi.spyOn(OrderService.prototype, "getById").mockResolvedValue({
            id: "69b2e3124ef8843e772a0f3f",
            status: "pending",
        } as never);

        const response = await request(app).get("/api/admin/orders/69b2e3124ef8843e772a0f3f");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: "69b2e3124ef8843e772a0f3f",
            status: "pending",
        });
        expect(validateOrderId).toHaveBeenCalled();
        expect(getByIdSpy).toHaveBeenCalledWith("69b2e3124ef8843e772a0f3f");
    });

    it("PATCH /api/admin/orders/:id/status updates status", async () => {
        vi.mocked(validateSetOrderStatus).mockReturnValue({
            id: "69b2e3124ef8843e772a0f3f",
            status: "confirmed",
        } as never);

        const updateStatusSpy = vi.spyOn(OrderService.prototype, "updateStatus").mockResolvedValue({
            id: "69b2e3124ef8843e772a0f3f",
            status: "confirmed",
        } as never);

        const response = await request(app)
            .patch("/api/admin/orders/69b2e3124ef8843e772a0f3f/status")
            .send({ status: "confirmed" });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: "69b2e3124ef8843e772a0f3f",
            status: "confirmed",
        });
        expect(validateSetOrderStatus).toHaveBeenCalled();
        expect(updateStatusSpy).toHaveBeenCalledWith("69b2e3124ef8843e772a0f3f", "confirmed");
    });
});
