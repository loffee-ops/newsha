import type { ID, Slug } from "@shared/primitives";

export type CategoryDTO = {
    id: ID;
    name: string;
    nameEn: string;
    nameUa: string;
    slug: Slug;
    image?: string;
    description?: string;
    isActive: boolean;
};
