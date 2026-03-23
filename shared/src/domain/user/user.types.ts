import type { ID } from "@shared/primitives";

export const USER_ROLES = {
    GUEST: "guest",
    USER: "user",
    ADMIN: "admin",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export type User = {
    id: ID;
    name: string;
    email?: string;
    avatar?: string;
    role: Exclude<UserRole, "guest">;
};

export type GuestUser = {
    role: typeof USER_ROLES.GUEST;
};

export type CurrentUser = User | GuestUser;

export const GUEST_USER: GuestUser = {
    role: USER_ROLES.GUEST,
};
