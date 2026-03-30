import { fonts, colors } from "./variables/assets";
import { breakpoints, media, containers } from "./variables/layout";
import { fontSizes, fontWeights, lineHeights, fontMetrics } from "./variables/typography";
import {
    flex,
    flexCenter,
    flexBetween,
    flexColumn,
    flexLeft,
    flexRight,
    headerGrid,
    objectCover,
    objectContain,
} from "./variables/mixins";

import logoWhite from "../assets/logo/logo_newsha_white.svg";
import logoBlack from "../assets/logo/logo_newsha.svg";
import userIcon from "../assets/userUI/user.svg";
import shoppingBag from "../assets/userUI/bag.svg";

export const mainTheme = {
    fontSizes,
    fontWeights,
    lineHeights,
    breakpoints,
    containers,
    fonts,
    media,
    colors,
    fontMetrics,
    flex,
    flexCenter,
    flexBetween,
    flexColumn,
    flexLeft,
    flexRight,
    headerGrid,
    objectCover,
    objectContain,

    assets: {
        logo: {
            whiteLogo: logoWhite,
            blackLogo: logoBlack,
        },
        userIcon,
        shoppingBag,
    },
};

export type AppTheme = typeof mainTheme;
export type LogoVariant = keyof AppTheme["assets"]["logo"];
export type Breakpoint = keyof AppTheme["breakpoints"];
