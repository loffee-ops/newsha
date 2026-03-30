import type { CategoryDTO } from "@shared/contracts/category";

import type { RootState } from "@/app/store";

export const selectCategories = (state: RootState): readonly CategoryDTO[] => state.category.items;
export const selectCategoriesStatus = (state: RootState) => state.category.status;
export const selectCategoriesError = (state: RootState) => state.category.error;
