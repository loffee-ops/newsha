import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@/app/store/store";

const selectCheckoutState = (state: RootState) => state.checkout;

export const selectCheckoutOrder = createSelector([selectCheckoutState], (state) => state.order);

export const selectCheckoutStatus = createSelector([selectCheckoutState], (state) => state.status);

export const selectCheckoutError = createSelector([selectCheckoutState], (state) => state.error);

export const selectCheckoutSucceeded = createSelector(
    [selectCheckoutStatus],
    (status) => status === "succeeded",
);

export const selectIsCheckingOut = createSelector(
    [selectCheckoutStatus],
    (status) => status === "loading",
);

export { selectCheckoutState };
