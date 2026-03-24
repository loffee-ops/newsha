import { vi, describe, it, expect, afterEach } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";

import { app } from "@/app";

import { JWT_SECRET } from "@/config";

import { UserModel } from "@/models/user.model";

function makeUserToken() {
    return jwt.sign(
        {
            userId: "69b7364fcc3e587573709f89",
            role: "user",
            sessionId: "69b7ebd25ea6550cd0a50c88",
        },
        JWT_SECRET,
        {
            expiresIn: "1h",
        },
    );
}

afterEach(() => {
    vi.restoreAllMocks();
});

describe("GET /api/admin/analytics", () => {
    it("returns 403 json for non-admin user", async () => {
        vi.spyOn(UserModel, "findById").mockReturnValue({
            select: vi.fn().mockReturnValue({
                lean: vi.fn().mockResolvedValue({
                    role: "user",
                }),
            }),
        } as never);

        const token = makeUserToken();

        const response = await request(app)
            .get("/api/admin/analytics")
            .set("Cookie", [`auth_token=${token}`]);

        expect(response.status).toBe(403);
        expect(response.body).toEqual({
            code: "FORBIDDEN",
            kind: "FORBIDDEN",
            message: "Forbidden",
        });
    });
});
