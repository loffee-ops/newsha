import type { RootState } from "@/app/store";
import type { BannerDTO } from "@shared/contracts/banner";
import type { BannerPlacement } from "@shared/domain/banner";
import type { AsyncStatus } from "@/shared/config";
import type { BannerPlacementState } from "./banner.slice";

const EMPTY_ITEMS: readonly BannerDTO[] = [];

const EMPTY_STATE: BannerPlacementState = {
    items: [],
    status: "idle" satisfies AsyncStatus,
    error: null,
};

export const selectBannersState = (state: RootState) => state.banners;

export const selectBannerPlacementState =
    (placement: BannerPlacement) =>
    (state: RootState): BannerPlacementState =>
        state.banners.byPlacement[placement] ?? EMPTY_STATE;

export const selectBannersByPlacement =
    (placement: BannerPlacement) =>
    (state: RootState): readonly BannerDTO[] =>
        state.banners.byPlacement[placement]?.items ?? EMPTY_ITEMS;

export const selectBannersStatusByPlacement =
    (placement: BannerPlacement) =>
    (state: RootState): AsyncStatus =>
        state.banners.byPlacement[placement]?.status ?? "idle";

export const selectBannersErrorByPlacement =
    (placement: BannerPlacement) =>
    (state: RootState): string | null =>
        state.banners.byPlacement[placement]?.error ?? null;
