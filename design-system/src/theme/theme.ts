import { fonts, colors, zIndex } from "./variables/assets";
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
import userIcon from "../assets/userUI/profile.svg";
import shoppingBag from "../assets/userUI/cart.svg";
import heartIcon from "../assets/userUI/heart.svg";
import homeIcon from "../assets/userUI/home.svg";
import messageIcon from "../assets/userUI/message.svg";
import notificationIcon from "../assets/userUI/notification.svg";
import searchIcon from "../assets/userUI/search.svg";
import glassIcon from "../assets/utils/close-glass.svg";
import moreIcon from "../assets/utils/more-circle.svg";
import discoverIcon from "../assets/userUI/discover.svg?react";

export const mainTheme = {
    fontSizes,
    fontWeights,
    lineHeights,
    breakpoints,
    containers,
    fonts,
    media,
    colors,
    zIndex,
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
        heartIcon,
        homeIcon,
        messageIcon,
        notificationIcon,
        searchIcon,
        glassIcon,
        moreIcon,
        discoverIcon,
    },
};

export type AppTheme = typeof mainTheme;
export type LogoVariant = keyof AppTheme["assets"]["logo"];
export type Breakpoint = keyof AppTheme["breakpoints"];
