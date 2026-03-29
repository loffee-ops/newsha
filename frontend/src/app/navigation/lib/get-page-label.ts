import { NAV_PAGE_LABELS } from "@/app/navigation/config";

export function getPageLabel(pathname: string): string | null {
    return NAV_PAGE_LABELS[pathname as keyof typeof NAV_PAGE_LABELS] ?? null;
}
