import type { UserRepository } from "@/entities/user/repository/user.repository";
import { HttpUserRepository } from "@/entities/user/repository/http-user.repository";

export function createUserService(): UserRepository {
    return new HttpUserRepository();
}
