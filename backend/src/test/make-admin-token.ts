import jwt from "jsonwebtoken";

export function makeAdminToken(): string {
    return jwt.sign(
        {
            userId: "69b2e3124ef8843e772a0f3f",
            role: "admin",
        },
        process.env.JWT_SECRET || "test-secret",
        {
            expiresIn: "1h",
        },
    );
}
