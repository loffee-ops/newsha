import type { Category } from "@shared/domain/category";
import { asID, asSlug } from "@shared/primitives";

import type { CategoryPersistence } from "./category.persistence";

export function toCategoryEntity(doc: CategoryPersistence): Category {
    return {
        id: asID(doc._id.toString()),
        name: doc.name,
        nameEn: doc.nameEn,
        nameUa: doc.nameUa,
        slug: asSlug(doc.slug),
        image: doc.image ?? undefined,
        description: doc.description ?? undefined,
        parentId: null,
        isActive: doc.isActive,
        order: 0,
        showOnHome: undefined,
    };
}
