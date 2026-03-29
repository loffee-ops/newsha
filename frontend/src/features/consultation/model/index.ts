export type { ConsultationState } from "./consultation.slice";
export type { ConsultationModalState } from "./consultation-ui.slice";

export {
    createConsultation,
    fetchConsultations,
    updateConsultationStatus,
    deleteConsultation,
} from "./consultation.thunks";

export { resetConsultationCreateState, consultationReducer } from "./consultation.slice";

export {
    openConsultation,
    closeConsultation,
    showConsultationSuccess,
    consultationUIReducer,
} from "./consultation-ui.slice";

export { selectConsultationModal } from "./consultation.selectors";
