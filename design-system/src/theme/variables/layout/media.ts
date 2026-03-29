import { breakpoints } from "./breakpoints";

export const media = {
    mobile: `(min-width: ${breakpoints.mobile}px)`,
    mobileLg: `(min-width: ${breakpoints.mobileLg}px)`,
    tablet: `(min-width: ${breakpoints.tablet}px)`,
    tabletLg: `(min-width: ${breakpoints.tabletLg}px)`,
    laptop: `(min-width: ${breakpoints.laptop}px)`,
    desktop: `(min-width: ${breakpoints.desktop}px)`,
    wide: `(min-width: ${breakpoints.wide}px)`,
} as const;
