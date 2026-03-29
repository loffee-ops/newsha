import type {
    CooperationDTO,
    CooperationLeadDTO,
} from "@shared/contracts/cooperation/cooperation.dto";
import { CooperationStatus } from "@shared/domain/cooperation";

export interface CooperationRepository {
    createCooperation(payload: CooperationLeadDTO): Promise<CooperationDTO>;
    getAllCooperations(): Promise<readonly CooperationDTO[]>;
    updateCooperationStatus(id: string, status: CooperationStatus): Promise<CooperationDTO>;
    deleteCooperation(id: string): Promise<void>;
}
