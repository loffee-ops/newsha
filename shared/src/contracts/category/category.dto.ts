import type { ID, Slug } from "@shared/primitives";

export type CategoryDTO = {
    id: ID;
    name: string;
    nameEn: string;
    nameUa: string;
    slug: Slug;
    image?: string | null;
    description?: string | null;
    parentId: ID | null;
    isActive: boolean;
    order: number;
    showOnHome?: boolean;
};
