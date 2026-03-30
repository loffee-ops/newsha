import type { ChangePasswordDTO, UpdateProfileDTO } from "@shared/contracts/user";
import type { User } from "@shared/domain/user";

export interface UserRepository {
    getMe(): Promise<User>;
    updateMe(dto: UpdateProfileDTO): Promise<User>;
    changePassword(dto: ChangePasswordDTO): Promise<void>;
}
