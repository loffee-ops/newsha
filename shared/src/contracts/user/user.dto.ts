export type UpdateProfileDTO = {
    name: string;
    phone?: string;
    avatar?: string;
};

export type ChangePasswordDTO = {
    currentPassword: string;
    newPassword: string;
};
