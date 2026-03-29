import type { ChangePasswordDTO, UpdateProfileDTO } from "@shared/contracts/user/user.dto";
import type { User } from "@shared/domain/user";

import { userApi } from "../api/user.api";
import type { UserRepository } from "./user.repository";

export class HttpUserRepository implements UserRepository {
    async getMe(): Promise<User> {
        const response = await userApi.getMe();
        return response.user;
    }

    async updateMe(dto: UpdateProfileDTO): Promise<User> {
        const response = await userApi.updateMe(dto);
        return response.user;
    }

    async changePassword(dto: ChangePasswordDTO): Promise<void> {
        await userApi.changePassword(dto);
    }
}
