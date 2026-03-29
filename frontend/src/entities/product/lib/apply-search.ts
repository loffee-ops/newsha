import type { Product } from "@/entities/product/types";

export function applySearch(products: readonly Product[], search?: string): Product[] {
    const query = search?.trim().toLowerCase();

    return products.filter((product) => {
        if (!product.isActive) return false;
        if (!query) return true;

        const name = product.name.toLowerCase();
        const code = product.code.toLowerCase();
        const shortDescription = product.shortDescription?.toLowerCase() ?? "";

        return name.includes(query) || code.includes(query) || shortDescription.includes(query);
    });
}
