import type { RootState } from "@/app/store";

export const selectIsBurgerOpen = (state: RootState) => state.burger.open;
export const selectBurgerExpanded = (state: RootState) => state.burger.expanded;
