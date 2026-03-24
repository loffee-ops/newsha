import { afterEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

import { app } from "@/app";
import { categoryService } from "@/services/categories.service";

describe("GET /api/categories", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("returns category list", async () => {
        const getPublicListSpy = vi.spyOn(categoryService, "getPublicList").mockResolvedValue([
            {
                _id: "69b2e5d8b56de1a8330fcd6b",
                name: "Кондиціонери",
                nameEn: "Conditioners",
                nameUa: "Кондиціонери",
                slug: "kondytsionery",
                image: "",
                description: "",
                isActive: true,
            },
        ] as never);

        const response = await request(app).get("/api/categories");

        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            {
                id: "69b2e5d8b56de1a8330fcd6b",
                name: "Кондиціонери",
                nameEn: "Conditioners",
                nameUa: "Кондиціонери",
                slug: "kondytsionery",
                image: "",
                description: "",
                isActive: true,
            },
        ]);

        expect(getPublicListSpy).toHaveBeenCalled();
    });
});
