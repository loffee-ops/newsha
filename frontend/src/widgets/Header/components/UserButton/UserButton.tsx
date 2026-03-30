import { useTheme } from "styled-components";

import { USER_ROLES, type CurrentUser, type User } from "@shared/domain/user";
import type { AppTheme } from "@design-system/theme";

import {
    ButtonRoot,
    AvatarBox,
    AvatarImage,
    AvatarInitial,
    UserIconImage,
    UserLabel,
} from "./UserButton.styled";

type UserButtonProps = {
    user: CurrentUser | null;
    onClick?: () => void;
    className?: string;
};

function isAuthorizedUser(user: CurrentUser | null): user is User {
    return !!user && user.role !== USER_ROLES.GUEST;
}

function getInitial(name: string): string {
    const trimmed = name.trim();

    if (!trimmed) {
        return "U";
    }

    return trimmed.charAt(0).toUpperCase();
}

export function UserButton({ user, onClick, className }: UserButtonProps) {
    const theme = useTheme() as AppTheme;

    const authorized = isAuthorizedUser(user);
    const label = authorized ? user.name.trim() || "User" : "Account";
    const avatar = authorized ? user.avatar?.trim() || null : null;
    const initial = authorized ? getInitial(label) : null;
    const userIcon = theme.assets.userIcon;

    return (
        <ButtonRoot
            type="button"
            onClick={onClick}
            aria-label={authorized ? `Open user menu for ${label}` : "Open auth modal"}
            {...(className ? { className } : {})}
        >
            <AvatarBox>
                {avatar ? (
                    <AvatarImage src={avatar} alt={label} />
                ) : authorized ? (
                    <AvatarInitial aria-hidden="true">{initial}</AvatarInitial>
                ) : (
                    <UserIconImage src={userIcon} alt="" aria-hidden="true" />
                )}
            </AvatarBox>

            {authorized ? <UserLabel>{label}</UserLabel> : null}
        </ButtonRoot>
    );
}
