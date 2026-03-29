export { productReducer, clearSelected, clearSearchResults } from "./product.slice";

export {
    fetchProducts,
    fetchProductById,
    fetchProductBySlug,
    searchProducts,
} from "./product.thunks";

export type { ProductState } from "./product.state";

export {
    selectProductState,
    selectProductPreviews,
    selectProductListMeta,
    selectProductSearchItems,
    selectProductSelected,
    selectProductListStatus,
    selectProductSearchStatus,
    selectProductSelectedStatus,
    selectProductError,
    selectIsProductsLoaded,
    selectHasSearchResults,
    selectNewArrivals,
    makeSelectProductPreviewBySlug,
    makeSelectSearchPreviewBySlug,
    makeSelectSelectedProductBySlug,
} from "./product.selectors";
