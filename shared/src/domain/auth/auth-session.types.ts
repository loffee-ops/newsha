import type { User } from "@shared/domain/user";

export interface AuthSession {
    user: User;
}
