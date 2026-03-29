import { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";

import {
    selectConsultationModal,
    openConsultation,
    closeConsultation,
    showConsultationSuccess,
} from "@/features/consultation/model";

export function useConsultation() {
    const dispatch = useAppDispatch();
    const modal = useAppSelector(selectConsultationModal);

    const open = useCallback(() => {
        dispatch(openConsultation());
    }, [dispatch]);

    const close = useCallback(() => {
        dispatch(closeConsultation());
    }, [dispatch]);

    const success = useCallback(() => {
        dispatch(showConsultationSuccess());
    }, [dispatch]);

    return {
        modal,
        open,
        close,
        success,
        isOpen: modal !== "closed",
        isForm: modal === "form",
        isSuccess: modal === "success",
    };
}
