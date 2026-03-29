import { createAsyncThunk } from "@reduxjs/toolkit";

import { saveUTMFromUrl } from "@/app/analytics/lib";
import type { AppThunkApiConfig as AppThunkApi } from "@/app/store/store";

import { restoreSession } from "@/features/auth/model/auth.thunks";
import { loadWishlist } from "@/features/wishlist/model";

export const initializeApp = createAsyncThunk<void, void, AppThunkApi>(
    "app/initialize",
    async (_, { dispatch }) => {
        saveUTMFromUrl();

        const session = await dispatch(restoreSession())
            .unwrap()
            .catch(() => null);

        if (session) {
            await dispatch(loadWishlist())
                .unwrap()
                .catch(() => {
                    // ignore wishlist
                });
        }
    },
);
