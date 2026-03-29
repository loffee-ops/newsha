export type ProductFilters = {
    categoryId?: string;
    tags: string[];
    needs: string[];
    condition: string[];
    volumes: number[];
    price: {
        min?: number;
        max?: number;
    };
};
