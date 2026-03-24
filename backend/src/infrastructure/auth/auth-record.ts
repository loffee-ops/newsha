import type { User } from "@shared/domain/user";

export type AuthRecord = {
    user: User;
    password: string;
};
