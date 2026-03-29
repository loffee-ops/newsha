import type { ProductVolumeOption } from "@/entities/product/types";

export function generateVolumeLabel(
    value: ProductVolumeOption["value"],
    unit?: ProductVolumeOption["unit"],
): string {
    return `${value} ${unit ?? "ml"}`;
}

export function getVolumeLabel(option: Pick<ProductVolumeOption, "value" | "unit">): string {
    return generateVolumeLabel(option.value, option.unit);
}
