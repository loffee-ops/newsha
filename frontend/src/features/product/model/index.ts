export type { ProductState, ProductListMeta } from "./product.state";
export type { AdminProductsState } from "./admin-products.state";

export { fetchProducts, fetchProductById, fetchProductBySlug } from "./product.thunks";

export {
    fetchAdminProducts,
    fetchAdminProductById,
    createAdminProduct,
    updateAdminProduct,
    deleteAdminProduct,
    setAdminProductActive,
    setAdminProductFlags,
} from "./admin-products.thunks";

export { clearSelected, productReducer } from "./product.slice";

export {
    clearAdminProductSelected,
    resetAdminProductCreateState,
    resetAdminProductUpdateState,
    resetAdminProductDeleteState,
    resetAdminProductToggleActiveState,
    resetAdminProductToggleFlagsState,
    adminProductsReducer,
} from "./admin-products.slice";

export {
    selectProductState,
    selectProductPreviews,
    selectProductListMeta,
    selectProductSelected,
    selectProductListStatus,
    selectProductSelectedStatus,
    selectProductError,
    selectIsProductsLoaded,
    selectNewArrivals,
    makeSelectProductPreviewBySlug,
    makeSelectSelectedProductBySlug,
} from "./product.selectors";

export {
    selectAdminProductsState,
    selectAdminProducts,
    selectAdminProductSelected,
    selectAdminProductsStatus,
    selectAdminProductsError,
    selectAdminProductsPage,
    selectAdminProductsLimit,
    selectAdminProductsTotal,
    selectAdminProductsTotalPages,
    selectAdminProductsHasNext,
    selectAdminProductsHasPrev,
    selectAdminProductCreateStatus,
    selectAdminProductCreateError,
    selectAdminProductUpdateStatus,
    selectAdminProductUpdateError,
    selectAdminProductDeleteStatus,
    selectAdminProductDeleteError,
    selectAdminProductToggleActiveStatus,
    selectAdminProductToggleActiveError,
    selectAdminProductToggleFlagsStatus,
    selectAdminProductToggleFlagsError,
    selectIsAdminProductsLoading,
    selectHasAdminProducts,
} from "./admin-products.selectors";
