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

import { app } from "@/app";
import { ProductService } from "@/services/product.service";

describe("admin products controller", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("GET /api/admin/products returns paginated products", async () => {
        const getAdminListSpy = vi
            .spyOn(ProductService.prototype, "getAdminList")
            .mockResolvedValue({
                items: [],
                page: 1,
                limit: 20,
                total: 0,
                pages: 1,
            } as never);

        const response = await request(app).get("/api/admin/products");

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

    it("GET /api/admin/products/:id returns one product", async () => {
        const getAdminByIdSpy = vi
            .spyOn(ProductService.prototype, "getAdminById")
            .mockResolvedValue({
                id: "69b2e3124ef8843e772a0f3f",
                name: "Test Product",
            } as never);

        const response = await request(app).get("/api/admin/products/69b2e3124ef8843e772a0f3f");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: "69b2e3124ef8843e772a0f3f",
            name: "Test Product",
        });
        expect(getAdminByIdSpy).toHaveBeenCalledWith("69b2e3124ef8843e772a0f3f");
    });

    it("POST /api/admin/products creates product", async () => {
        const createSpy = vi.spyOn(ProductService.prototype, "create").mockResolvedValue({
            id: "69b2e3124ef8843e772a0f3f",
            name: "New Product",
        } as never);

        const response = await request(app).post("/api/admin/products").send({
            name: "New Product",
        });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            id: "69b2e3124ef8843e772a0f3f",
            name: "New Product",
        });
        expect(createSpy).toHaveBeenCalledWith({
            name: "New Product",
        });
    });

    it("PATCH /api/admin/products/:id updates product", async () => {
        const updateSpy = vi.spyOn(ProductService.prototype, "update").mockResolvedValue({
            id: "69b2e3124ef8843e772a0f3f",
            name: "Updated Product",
        } as never);

        const response = await request(app)
            .patch("/api/admin/products/69b2e3124ef8843e772a0f3f")
            .send({ name: "Updated Product" });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: "69b2e3124ef8843e772a0f3f",
            name: "Updated Product",
        });
        expect(updateSpy).toHaveBeenCalledWith("69b2e3124ef8843e772a0f3f", {
            name: "Updated Product",
        });
    });

    it("DELETE /api/admin/products/:id returns ok", async () => {
        const deleteSpy = vi
            .spyOn(ProductService.prototype, "delete")
            .mockResolvedValue(undefined as never);

        const response = await request(app).delete("/api/admin/products/69b2e3124ef8843e772a0f3f");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ ok: true });
        expect(deleteSpy).toHaveBeenCalledWith("69b2e3124ef8843e772a0f3f");
    });

    it("PATCH /api/admin/products/:id/active updates active flag", async () => {
        const setActiveSpy = vi.spyOn(ProductService.prototype, "setActive").mockResolvedValue({
            id: "69b2e3124ef8843e772a0f3f",
            isActive: true,
        } as never);

        const response = await request(app)
            .patch("/api/admin/products/69b2e3124ef8843e772a0f3f/active")
            .send({ isActive: true });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: "69b2e3124ef8843e772a0f3f",
            isActive: true,
        });
        expect(setActiveSpy).toHaveBeenCalledWith("69b2e3124ef8843e772a0f3f", true);
    });

    it("PATCH /api/admin/products/:id/active returns 400 for invalid isActive", async () => {
        const response = await request(app)
            .patch("/api/admin/products/69b2e3124ef8843e772a0f3f/active")
            .send({ isActive: "yes" });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            code: "BAD_REQUEST",
            kind: "VALIDATION",
            message: "isActive must be boolean",
        });
    });

    it("PATCH /api/admin/products/:id/flags updates flags", async () => {
        const setFlagsSpy = vi.spyOn(ProductService.prototype, "setFlags").mockResolvedValue({
            id: "69b2e3124ef8843e772a0f3f",
            isNew: true,
            isBestseller: false,
            isTop: true,
        } as never);

        const response = await request(app)
            .patch("/api/admin/products/69b2e3124ef8843e772a0f3f/flags")
            .send({
                isNew: true,
                isTop: true,
            });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: "69b2e3124ef8843e772a0f3f",
            isNew: true,
            isBestseller: false,
            isTop: true,
        });
        expect(setFlagsSpy).toHaveBeenCalledWith("69b2e3124ef8843e772a0f3f", {
            isNew: true,
            isBestseller: undefined,
            isTop: true,
        });
    });

    it("PATCH /api/admin/products/:id/flags returns 400 for invalid flags payload", async () => {
        const response = await request(app)
            .patch("/api/admin/products/69b2e3124ef8843e772a0f3f/flags")
            .send({
                isNew: "yes",
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            code: "BAD_REQUEST",
            kind: "VALIDATION",
            message: "At least one of isNew, isBestseller, isTop must be boolean",
        });
    });

    it("returns 400 for invalid product id", async () => {
        const response = await request(app).get("/api/admin/products/not-valid-id");

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            code: "BAD_REQUEST",
            kind: "VALIDATION",
            message: "Invalid product id",
        });
    });
});
