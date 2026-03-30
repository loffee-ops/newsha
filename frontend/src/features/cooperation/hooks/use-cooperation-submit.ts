import { useCallback } from "react";

import type { CooperationLeadDTO } from "@shared/contracts/cooperation";

import { useAppDispatch, useAppSelector } from "@/app/store";

import {
    submitCooperation,
    resetCooperationSubmitState,
    selectCooperationSubmitStatus,
    selectCooperationSubmitError,
} from "@/features/cooperation/model";

export function useCooperationSubmit() {
    const dispatch = useAppDispatch();

    const status = useAppSelector(selectCooperationSubmitStatus);
    const error = useAppSelector(selectCooperationSubmitError);

    const submit = useCallback(
        async (values: CooperationLeadDTO) => {
            return dispatch(submitCooperation(values)).unwrap();
        },
        [dispatch],
    );

    const reset = useCallback(() => {
        dispatch(resetCooperationSubmitState());
    }, [dispatch]);

    return {
        submit,
        reset,
        status,
        error,
        isLoading: status === "loading",
        isSuccess: status === "succeeded",
        isError: status === "failed",
    };
}
