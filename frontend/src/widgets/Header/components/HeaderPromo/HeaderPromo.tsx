import React from "react";
import { PromoBar, PromoText } from "./HeaderPromo.styled";
import { HEADER_PROMO_TEXT } from "./HeaderPromo.text";

export const HeaderPromo: React.FC = () => {
    return (
        <PromoBar>
            <PromoText>{HEADER_PROMO_TEXT}</PromoText>
        </PromoBar>
    );
};

export default HeaderPromo;
