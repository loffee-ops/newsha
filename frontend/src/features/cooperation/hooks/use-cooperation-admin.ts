import { useCallback, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";

import type { CooperationStatus } from "@shared/domain/cooperation";
import type { ID } from "@shared/primitives";
import {
    fetchCooperations,
    updateCooperationStatus,
    deleteCooperation,
    selectCooperationItems,
    selectCooperationStatus,
    selectCooperationError,
} from "@/features/cooperation/model";

type Options = {
    autoLoad?: boolean;
};

export function useCooperationAdmin(options?: Options) {
    const dispatch = useAppDispatch();

    const items = useAppSelector(selectCooperationItems);
    const status = useAppSelector(selectCooperationStatus);
    const error = useAppSelector(selectCooperationError);

    const autoLoad = options?.autoLoad ?? true;

    useEffect(() => {
        if (!autoLoad) return;
        if (status !== "idle") return;

        void dispatch(fetchCooperations());
    }, [autoLoad, status, dispatch]);

    const reload = useCallback(async () => {
        return dispatch(fetchCooperations()).unwrap();
    }, [dispatch]);

    const updateStatus = useCallback(
        async (id: ID, nextStatus: CooperationStatus) => {
            return dispatch(updateCooperationStatus({ id, status: nextStatus })).unwrap();
        },
        [dispatch],
    );

    const remove = useCallback(
        async (id: ID) => {
            return dispatch(deleteCooperation(id)).unwrap();
        },
        [dispatch],
    );

    return {
        items,
        status,
        error,
        reload,
        updateStatus,
        remove,
        isLoading: status === "loading",
        isSuccess: status === "succeeded",
        isError: status === "failed",
        isEmpty: status === "succeeded" && items.length === 0,
    };
}
