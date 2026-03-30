import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@/app/store";

const selectAdminBannerState = (state: RootState) => state.adminBanner;

export const selectAdminBanners = createSelector([selectAdminBannerState], (state) => state.items);

export const selectAdminBannerStatus = createSelector(
    [selectAdminBannerState],
    (state) => state.status,
);

export const selectAdminBannerError = createSelector(
    [selectAdminBannerState],
    (state) => state.error,
);

export const selectAdminBannerPage = createSelector(
    [selectAdminBannerState],
    (state) => state.page,
);

export const selectAdminBannerLimit = createSelector(
    [selectAdminBannerState],
    (state) => state.limit,
);

export const selectAdminBannerTotal = createSelector(
    [selectAdminBannerState],
    (state) => state.total,
);

export const selectAdminBannerPages = createSelector(
    [selectAdminBannerState],
    (state) => state.pages,
);

export const selectAdminBannerUploadStatus = createSelector(
    [selectAdminBannerState],
    (state) => state.uploadStatus,
);

export const selectAdminBannerUploadError = createSelector(
    [selectAdminBannerState],
    (state) => state.uploadError,
);

export const selectAdminBannerUpdateStatus = createSelector(
    [selectAdminBannerState],
    (state) => state.updateStatus,
);

export const selectAdminBannerUpdateError = createSelector(
    [selectAdminBannerState],
    (state) => state.updateError,
);

export const selectAdminBannerDeleteStatus = createSelector(
    [selectAdminBannerState],
    (state) => state.deleteStatus,
);

export const selectAdminBannerDeleteError = createSelector(
    [selectAdminBannerState],
    (state) => state.deleteError,
);

export const selectIsAdminBannerLoading = createSelector(
    [selectAdminBannerStatus],
    (status) => status === "loading",
);

export const selectIsAdminBannerUploading = createSelector(
    [selectAdminBannerUploadStatus],
    (status) => status === "loading",
);

export const selectIsAdminBannerUpdating = createSelector(
    [selectAdminBannerUpdateStatus],
    (status) => status === "loading",
);

export const selectIsAdminBannerDeleting = createSelector(
    [selectAdminBannerDeleteStatus],
    (status) => status === "loading",
);

export const selectHasAdminBanners = createSelector(
    [selectAdminBanners],
    (items) => items.length > 0,
);

export { selectAdminBannerState };
