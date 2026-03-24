export type ProductFilter = {
    isActive: boolean;
    categoryId?: string;
    tags?: string;
    needs?: string;
    condition?: string;
    "volumes.value"?: number;
    price?: { $gte?: number; $lte?: number };
    isBestseller?: boolean;
    isNewArrival?: boolean;
    isTop?: boolean;
};
