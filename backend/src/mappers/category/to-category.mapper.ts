import type { Category } from "@shared/domain/category";
import type { CategoryDTO } from "@shared/contracts/category";

export function toCategoryDTO(entity: Category): CategoryDTO {
    return {
        id: entity.id,
        name: entity.name,
        nameEn: entity.nameEn,
        nameUa: entity.nameUa,
        slug: entity.slug,
        image: entity.image,
        description: entity.description,
        isActive: entity.isActive,
    };
}
