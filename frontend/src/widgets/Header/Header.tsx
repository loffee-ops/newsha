import { useAppSelector } from "@/app/store";

import { Logo } from "./components/Logo/Logo";
import { CartButton } from "@/features/cart/ui/CartButton";
import { HeaderSearch } from "./components/HeaderSearch";
import { selectIsSearchOpen } from "@/features/search/model";

import { HeaderInner, HeaderRoot, HeaderActions } from "./Header.styled";

export function Header() {
    const isSearchOpen = useAppSelector(selectIsSearchOpen);

    return (
        <HeaderRoot>
            <HeaderInner>
                <Logo />

                <HeaderActions>
                    <CartButton />
                </HeaderActions>
            </HeaderInner>

            {isSearchOpen ? <HeaderSearch /> : null}
        </HeaderRoot>
    );
}
