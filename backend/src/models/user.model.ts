import { Schema, model, type HydratedDocument } from "mongoose";

import type { UserRole } from "@shared/domain/user";
import { USER_ROLES } from "@shared/domain/user";

export type DBUserRole = Exclude<UserRole, "guest">;

export interface IUser {
    name: string;
    phone?: string;
    email: string;
    passwordHash: string;
    avatar?: string;
    role: DBUserRole;
}

const roles: DBUserRole[] = [USER_ROLES.USER, USER_ROLES.ADMIN];

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true, trim: true },
        phone: { type: String, required: false, trim: true },
        email: { type: String, required: true, trim: true, lowercase: true },
        passwordHash: { type: String, required: true, select: false },
        avatar: { type: String, required: false, trim: true },
        role: { type: String, enum: roles, default: USER_ROLES.USER },
    },
    { timestamps: true },
);

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ phone: 1 });
UserSchema.index({ role: 1, createdAt: -1 });
UserSchema.index({ createdAt: -1 });

export const UserModel = model<IUser>("User", UserSchema);

export type UserDoc = HydratedDocument<IUser>;
