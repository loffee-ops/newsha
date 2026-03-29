import type { ProductVolumeOption } from "./product.types";

import type { ProductVolume } from "@shared/domain/product";

export type VolumeSelectorListProps = {
    volumes: readonly ProductVolumeOption[];
    selected: ProductVolume | null;
    onSelect: (value: ProductVolume) => void;
};
