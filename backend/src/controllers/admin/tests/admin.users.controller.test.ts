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

vi.mock("@/validation/user.validation", () => ({
    validateUserId: vi.fn(),
    validateUserRole: vi.fn(),
}));

import { app } from "@/app";
import { userService } from "@/services/user.service";
import { validateUserId, validateUserRole } from "@/validation/user.validation";

describe("admin users controller", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("GET /api/admin/users returns paginated users", async () => {
        const getAdminListSpy = vi.spyOn(userService, "getAdminList").mockResolvedValue({
            items: [],
            page: 1,
            limit: 20,
            total: 0,
            pages: 1,
        } as never);

        const response = await request(app).get("/api/admin/users");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            items: [],
            page: 1,
            limit: 20,
            total: 0,
            pages: 1,
        });
        expect(getAdminListSpy).toHaveBeenCalled();
    });

    it("GET /api/admin/users/:id returns one user", async () => {
        vi.mocked(validateUserId).mockReturnValue("69b2e3124ef8843e772a0f3f" as never);

        const getByIdSpy = vi.spyOn(userService, "getById").mockResolvedValue({
            id: "69b2e3124ef8843e772a0f3f",
            name: "Admin",
            email: "admin@newsha.com",
            role: "admin",
        } as never);

        const response = await request(app).get("/api/admin/users/69b2e3124ef8843e772a0f3f");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: "69b2e3124ef8843e772a0f3f",
            name: "Admin",
            email: "admin@newsha.com",
            role: "admin",
        });
        expect(validateUserId).toHaveBeenCalled();
        expect(getByIdSpy).toHaveBeenCalledWith("69b2e3124ef8843e772a0f3f");
    });

    it("PATCH /api/admin/users/:id/role updates role", async () => {
        vi.mocked(validateUserId).mockReturnValue("69b2e3124ef8843e772a0f3f" as never);
        vi.mocked(validateUserRole).mockReturnValue("admin" as never);

        const updateRoleSpy = vi.spyOn(userService, "updateRole").mockResolvedValue({
            id: "69b2e3124ef8843e772a0f3f",
            name: "Admin",
            email: "admin@newsha.com",
            role: "admin",
        } as never);

        const response = await request(app)
            .patch("/api/admin/users/69b2e3124ef8843e772a0f3f/role")
            .send({ role: "admin" });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: "69b2e3124ef8843e772a0f3f",
            name: "Admin",
            email: "admin@newsha.com",
            role: "admin",
        });
        expect(validateUserId).toHaveBeenCalled();
        expect(validateUserRole).toHaveBeenCalledWith("admin");
        expect(updateRoleSpy).toHaveBeenCalledWith("69b2e3124ef8843e772a0f3f", "admin");
    });

    it("DELETE /api/admin/users/:id returns ok", async () => {
        vi.mocked(validateUserId).mockReturnValue("69b2e3124ef8843e772a0f3f" as never);

        const deleteSpy = vi.spyOn(userService, "delete").mockResolvedValue(undefined as never);

        const response = await request(app).delete("/api/admin/users/69b2e3124ef8843e772a0f3f");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ ok: true });
        expect(validateUserId).toHaveBeenCalled();
        expect(deleteSpy).toHaveBeenCalledWith("69b2e3124ef8843e772a0f3f");
    });
});
