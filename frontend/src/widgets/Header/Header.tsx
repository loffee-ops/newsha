import { Logo } from "./components/Logo/Logo";

import { HeaderInner, HeaderRoot } from "./Header.styled";

export function Header() {
    return (
        <HeaderRoot>
            <HeaderInner>
                <Logo />
            </HeaderInner>
        </HeaderRoot>
    );
}
