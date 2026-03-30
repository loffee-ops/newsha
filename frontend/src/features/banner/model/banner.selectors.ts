import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@/app/store";

const selectBannerState = (state: RootState) => state.banner;

export const selectBanners = createSelector([selectBannerState], (state) => state.items);
export const selectBannerStatus = createSelector([selectBannerState], (state) => state.status);
export const selectBannerError = createSelector([selectBannerState], (state) => state.error);

export const selectIsBannerLoading = createSelector(
    [selectBannerStatus],
    (status) => status === "loading",
);

export const selectHasBanners = createSelector([selectBanners], (items) => items.length > 0);
export { selectBannerState };
