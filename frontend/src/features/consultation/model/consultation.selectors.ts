import type { RootState } from "@/app/store/store";

export const selectConsultations = (state: RootState) => state.consultation.items;
export const selectConsultationsStatus = (state: RootState) => state.consultation.status;
export const selectConsultationsError = (state: RootState) => state.consultation.error;

export const selectCreateConsultationStatus = (state: RootState) => state.consultation.createStatus;

export const selectCreateConsultationError = (state: RootState) => state.consultation.createError;

export const selectConsultationModal = (state: RootState) => state.consultationUI.modal;
