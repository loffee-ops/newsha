import { Logo } from "./components/Logo/Logo";
import { HeaderUserButton } from "./components/UserButton/HeaderUserButton";
import { HeaderCartButton } from "./components/CartButton/HeaderCartButton";

import { HeaderInner, HeaderRoot, HeaderActions } from "./Header.styled";

export function Header() {
    return (
        <HeaderRoot>
            <HeaderInner>
                <Logo />

                <HeaderActions>
                    <HeaderCartButton />
                    <HeaderUserButton />
                </HeaderActions>
            </HeaderInner>
        </HeaderRoot>
    );
}
