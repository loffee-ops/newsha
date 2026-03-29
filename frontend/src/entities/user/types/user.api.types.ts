import type { User } from "@shared/domain/user";

export type UserResponseDTO = {
    user: User;
};

export type OkResponseDTO = {
    ok: true;
};
