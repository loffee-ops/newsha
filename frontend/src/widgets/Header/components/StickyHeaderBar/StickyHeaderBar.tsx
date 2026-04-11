import { Logo } from "../Logo/Logo";
import { CartButton } from "../CartButton/CartButton";
import { BurgerButton } from "../BurgerButton/BurgerButton";
import {
    StickyHeaderBarRoot,
    StickyHeaderBarInner,
    StickyHeaderGlass,
    StickyHeaderContent,
} from "./StickyHeaderBar.styled";

export const StickyHeaderBar = () => {
    return (
        <StickyHeaderBarRoot>
            <StickyHeaderBarInner>
                <StickyHeaderGlass>
                    <StickyHeaderContent>
                        <BurgerButton />
                        <Logo />
                        <CartButton />
                    </StickyHeaderContent>
                </StickyHeaderGlass>
            </StickyHeaderBarInner>
        </StickyHeaderBarRoot>
    );
};

export default StickyHeaderBar;
