import { NAV_PAGE_LABELS } from "@/app/navigation/config";

export type NavRoute = keyof typeof NAV_PAGE_LABELS;

export function isNavPagePath(path: string): path is NavRoute {
    return Object.prototype.hasOwnProperty.call(NAV_PAGE_LABELS, path);
}
