export type { CategoryState } from "./category.slice";

export { fetchCategories } from "./category.thunks";
export { categoryReducer } from "./category.slice";
export {
    selectCategories,
    selectCategoriesStatus,
    selectCategoriesError,
} from "./category.selectors";

export type { AdminCategoriesState } from "./admin-categories.state";

export {
    fetchAdminCategories,
    fetchAdminCategoryById,
    createAdminCategory,
    updateAdminCategory,
    deleteAdminCategory,
    setAdminCategoryActive,
} from "./admin-categories.thunks";

export {
    clearAdminCategorySelected,
    resetAdminCategoryCreateState,
    resetAdminCategoryUpdateState,
    resetAdminCategoryDeleteState,
    resetAdminCategoryToggleState,
    adminCategoriesReducer,
} from "./admin-categories.slice";

export {
    selectAdminCategoriesState,
    selectAdminCategories,
    selectAdminCategorySelected,
    selectAdminCategoriesStatus,
    selectAdminCategoriesError,
    selectAdminCategoriesPage,
    selectAdminCategoriesLimit,
    selectAdminCategoriesTotal,
    selectAdminCategoriesTotalPages,
    selectAdminCategoriesHasNext,
    selectAdminCategoriesHasPrev,
    selectAdminCategoryCreateStatus,
    selectAdminCategoryCreateError,
    selectAdminCategoryUpdateStatus,
    selectAdminCategoryUpdateError,
    selectAdminCategoryDeleteStatus,
    selectAdminCategoryDeleteError,
    selectAdminCategoryToggleStatus,
    selectAdminCategoryToggleError,
    selectIsAdminCategoriesLoading,
    selectHasAdminCategories,
} from "./admin-categories.selectors";
