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

vi.mock("@/mappers/category", () => ({
    toCategoryDTO: vi.fn((value) => value),
    toCategoryEntity: vi.fn((value) => value),
}));

vi.mock("@/validation/category.validation", () => ({
    validateCategoryId: vi.fn(),
    validateCreateCategory: vi.fn(),
    validateUpdateCategory: vi.fn(),
}));

import { app } from "@/app";
import { categoryService } from "@/services/categories.service";
import { toCategoryDTO, toCategoryEntity } from "@/mappers/category";
import {
    validateCategoryId,
    validateCreateCategory,
    validateUpdateCategory,
} from "@/validation/category.validation";

describe("admin categories controller", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it("GET /api/admin/categories returns paginated categories", async () => {
        const getAdminListSpy = vi.spyOn(categoryService, "getAdminList").mockResolvedValue({
            items: [
                {
                    id: "69b2e3124ef8843e772a0f3f",
                    name: "Conditioners",
                    nameEn: "Conditioners",
                    nameUa: "Кондиціонери",
                    slug: "conditioners",
                    image: "",
                    description: "",
                    isActive: true,
                },
            ],
            page: 1,
            limit: 20,
            total: 1,
            pages: 1,
        } as never);

        const response = await request(app).get("/api/admin/categories");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            items: [
                {
                    id: "69b2e3124ef8843e772a0f3f",
                    name: "Conditioners",
                    nameEn: "Conditioners",
                    nameUa: "Кондиціонери",
                    slug: "conditioners",
                    image: "",
                    description: "",
                    isActive: true,
                },
            ],
            page: 1,
            limit: 20,
            total: 1,
            pages: 1,
        });

        expect(getAdminListSpy).toHaveBeenCalledTimes(1);
        expect(toCategoryEntity).toHaveBeenCalledTimes(1);
        expect(toCategoryDTO).toHaveBeenCalledTimes(1);
    });

    it("GET /api/admin/categories/:id returns one category", async () => {
        vi.mocked(validateCategoryId).mockReturnValue("69b2e3124ef8843e772a0f3f" as never);

        const getByIdSpy = vi.spyOn(categoryService, "getById").mockResolvedValue({
            id: "69b2e3124ef8843e772a0f3f",
            name: "Conditioners",
            nameEn: "Conditioners",
            nameUa: "Кондиціонери",
            slug: "conditioners",
            image: "",
            description: "",
            isActive: true,
        } as never);

        const response = await request(app).get("/api/admin/categories/69b2e3124ef8843e772a0f3f");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: "69b2e3124ef8843e772a0f3f",
            name: "Conditioners",
            nameEn: "Conditioners",
            nameUa: "Кондиціонери",
            slug: "conditioners",
            image: "",
            description: "",
            isActive: true,
        });

        expect(validateCategoryId).toHaveBeenCalledTimes(1);
        expect(getByIdSpy).toHaveBeenCalledWith("69b2e3124ef8843e772a0f3f");
        expect(toCategoryEntity).toHaveBeenCalledTimes(1);
        expect(toCategoryDTO).toHaveBeenCalledTimes(1);
    });

    it("POST /api/admin/categories creates category", async () => {
        vi.mocked(validateCreateCategory).mockReturnValue({
            name: "Masks",
            nameEn: "Masks",
            nameUa: "Маски",
            slug: "masks",
        } as never);

        const createSpy = vi.spyOn(categoryService, "create").mockResolvedValue({
            id: "69b2e3124ef8843e772a0f40",
            name: "Masks",
            nameEn: "Masks",
            nameUa: "Маски",
            slug: "masks",
            image: "",
            description: "",
            isActive: true,
        } as never);

        const response = await request(app).post("/api/admin/categories").send({
            name: "Masks",
            nameEn: "Masks",
            nameUa: "Маски",
            slug: "masks",
        });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            id: "69b2e3124ef8843e772a0f40",
            name: "Masks",
            nameEn: "Masks",
            nameUa: "Маски",
            slug: "masks",
            image: "",
            description: "",
            isActive: true,
        });

        expect(validateCreateCategory).toHaveBeenCalledTimes(1);
        expect(createSpy).toHaveBeenCalledWith({
            name: "Masks",
            nameEn: "Masks",
            nameUa: "Маски",
            slug: "masks",
        });
        expect(toCategoryEntity).toHaveBeenCalledTimes(1);
        expect(toCategoryDTO).toHaveBeenCalledTimes(1);
    });

    it("PATCH /api/admin/categories/:id updates category", async () => {
        vi.mocked(validateUpdateCategory).mockReturnValue({
            id: "69b2e3124ef8843e772a0f3f",
            name: "Updated Category",
        } as never);

        const updateSpy = vi.spyOn(categoryService, "update").mockResolvedValue({
            id: "69b2e3124ef8843e772a0f3f",
            name: "Updated Category",
            nameEn: "Conditioners",
            nameUa: "Кондиціонери",
            slug: "conditioners",
            image: "",
            description: "",
            isActive: true,
        } as never);

        const response = await request(app)
            .patch("/api/admin/categories/69b2e3124ef8843e772a0f3f")
            .send({ name: "Updated Category" });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: "69b2e3124ef8843e772a0f3f",
            name: "Updated Category",
            nameEn: "Conditioners",
            nameUa: "Кондиціонери",
            slug: "conditioners",
            image: "",
            description: "",
            isActive: true,
        });

        expect(validateUpdateCategory).toHaveBeenCalledTimes(1);
        expect(updateSpy).toHaveBeenCalledWith("69b2e3124ef8843e772a0f3f", {
            name: "Updated Category",
        });
        expect(toCategoryEntity).toHaveBeenCalledTimes(1);
        expect(toCategoryDTO).toHaveBeenCalledTimes(1);
    });

    it("DELETE /api/admin/categories/:id returns ok", async () => {
        vi.mocked(validateCategoryId).mockReturnValue("69b2e3124ef8843e772a0f3f" as never);

        const deleteSpy = vi.spyOn(categoryService, "delete").mockResolvedValue(undefined as never);

        const response = await request(app).delete(
            "/api/admin/categories/69b2e3124ef8843e772a0f3f",
        );

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ ok: true });
        expect(validateCategoryId).toHaveBeenCalledTimes(1);
        expect(deleteSpy).toHaveBeenCalledWith("69b2e3124ef8843e772a0f3f");
        expect(toCategoryEntity).not.toHaveBeenCalled();
        expect(toCategoryDTO).not.toHaveBeenCalled();
    });

    it("PATCH /api/admin/categories/:id/active updates active flag", async () => {
        vi.mocked(validateCategoryId).mockReturnValue("69b2e3124ef8843e772a0f3f" as never);

        const setActiveSpy = vi.spyOn(categoryService, "setActive").mockResolvedValue({
            id: "69b2e3124ef8843e772a0f3f",
            name: "Conditioners",
            nameEn: "Conditioners",
            nameUa: "Кондиціонери",
            slug: "conditioners",
            image: "",
            description: "",
            isActive: true,
        } as never);

        const response = await request(app)
            .patch("/api/admin/categories/69b2e3124ef8843e772a0f3f/active")
            .send({ isActive: true });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: "69b2e3124ef8843e772a0f3f",
            name: "Conditioners",
            nameEn: "Conditioners",
            nameUa: "Кондиціонери",
            slug: "conditioners",
            image: "",
            description: "",
            isActive: true,
        });

        expect(validateCategoryId).toHaveBeenCalledTimes(1);
        expect(setActiveSpy).toHaveBeenCalledWith("69b2e3124ef8843e772a0f3f", true);
        expect(toCategoryEntity).toHaveBeenCalledTimes(1);
        expect(toCategoryDTO).toHaveBeenCalledTimes(1);
    });

    it("PATCH /api/admin/categories/:id/active returns 400 for invalid isActive", async () => {
        vi.mocked(validateCategoryId).mockReturnValue("69b2e3124ef8843e772a0f3f" as never);

        const response = await request(app)
            .patch("/api/admin/categories/69b2e3124ef8843e772a0f3f/active")
            .send({ isActive: "yes" });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            code: "BAD_REQUEST",
            kind: "VALIDATION",
            message: "isActive must be boolean",
        });
    });
});
