import { configureStore } from "@reduxjs/toolkit";

import { reduxErrorMiddleware } from "@/app/error/middleware";
import { createServices, type AppServices } from "@/app/services/app-service";

import { rootReducer } from "./root-reducer";

const services = createServices();

export const store = configureStore({
    reducer: rootReducer,
    devTools: import.meta.env.DEV,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            thunk: {
                extraArgument: services,
            },
        }).concat(reduxErrorMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunkApiConfig = {
    state: RootState;
    dispatch: AppDispatch;
    extra: AppServices;
    rejectValue: string;
};
