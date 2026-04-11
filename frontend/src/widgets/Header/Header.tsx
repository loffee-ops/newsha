import { HeaderPromo } from "@/widgets/Header/components/HeaderPromo";
import { StickyHeaderBar } from "./components/StickyHeaderBar/StickyHeaderBar";
import { HeaderRoot, HeaderPromoRow } from "./Header.styled";

export const Header = () => {
    return (
        <>
            <HeaderRoot>
                <HeaderPromoRow>
                    <HeaderPromo />
                </HeaderPromoRow>
            </HeaderRoot>

            <StickyHeaderBar />
        </>
    );
};
