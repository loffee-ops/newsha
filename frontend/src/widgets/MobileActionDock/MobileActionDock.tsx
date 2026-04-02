import { useAppDispatch } from "@/app/store";
import { toggleSearch } from "@/features/search/model";

import { BurgerButton } from "@/features/burger/ui/BurgerButton";
import { SearchButton } from "@/features/search/ui/SearchButton";
import { AuthButton } from "@/features/auth/ui/AuthButton";
import { WishlistButton } from "@/features/wishlist/ui/WishlistButton/index";

import { DockRoot } from "./MobileActionDock.styled";
import type { MobileActionDockProps } from "./types";

export function MobileActionDock({
    onMenuClick,
    onUserClick,
    onWishlistClick,
    className,
}: MobileActionDockProps) {
    const dispatch = useAppDispatch();

    const handleSearchClick = () => {
        dispatch(toggleSearch());
    };

    return (
        <DockRoot {...(className ? { className } : {})}>
            <BurgerButton {...(onMenuClick ? { onClick: onMenuClick } : {})} />
            <SearchButton onClick={handleSearchClick} />
            <AuthButton {...(onUserClick ? { onClick: onUserClick } : {})} />
            <WishlistButton {...(onWishlistClick ? { onClick: onWishlistClick } : {})} />
        </DockRoot>
    );
}
