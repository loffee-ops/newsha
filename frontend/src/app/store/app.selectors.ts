import type { RootState } from "@/app/store";

export const selectAppState = (state: RootState) => state.app;
export const selectAppStatus = (state: RootState) => state.app.status;
export const selectIsAppReady = (state: RootState) => state.app.status === "ready";
export const selectIsAppBooting = (state: RootState) =>
    state.app.status === "booting" || state.app.status === "idle";
