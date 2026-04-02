export type { SearchState } from "./search.state";

export { searchProducts } from "./search.thunks";

export {
    clearSearchState,
    clearSearchResults,
    setSearchQuery,
    searchReducer,
} from "./search.slice";

export {
    selectSearchState,
    selectSearchItems,
    selectSearchStatus,
    selectSearchError,
    selectSearchQuery,
    selectIsSearchLoading,
    selectHasSearchResults,
} from "./search.selectors";

export {
    openSearch,
    closeSearch,
    toggleSearch,
    selectIsSearchOpen,
    searchUIReducer,
} from "./search-ui.slice";
