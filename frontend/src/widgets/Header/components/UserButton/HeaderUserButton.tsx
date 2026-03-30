import { useAppDispatch, useAppSelector } from "@/app/store";
import { openLoginModal } from "@/features/auth/model/auth-ui.slice";
import { selectUser } from "@/features/auth/model/auth.selectors";

import { UserButton } from "./UserButton";

type HeaderUserButtonProps = {
    className?: string;
};

export function HeaderUserButton({ className = "" }: HeaderUserButtonProps) {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);

    const handleClick = () => {
        dispatch(openLoginModal());
    };

    return <UserButton user={user} onClick={handleClick} className={className} />;
}
