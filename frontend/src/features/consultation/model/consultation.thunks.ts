import { createAsyncThunk } from "@reduxjs/toolkit";

import type {
    ConsultationDTO,
    ConsultationStatus,
    CreateConsultationDTO,
} from "@shared/contracts/consultation/consultation.dto";
import type { AppThunkApiConfig } from "@/app/store/store";

function getErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof Error && error.message.trim()) {
        return error.message;
    }

    if (typeof error === "string" && error.trim()) {
        return error;
    }

    return fallback;
}

export const createConsultation = createAsyncThunk<
    ConsultationDTO,
    CreateConsultationDTO,
    AppThunkApiConfig
>("consultation/create", async (payload, { extra, rejectWithValue }) => {
    try {
        return await extra.consultation.createConsultation(payload);
    } catch (error) {
        return rejectWithValue(getErrorMessage(error, "Failed to create consultation"));
    }
});

export const fetchConsultations = createAsyncThunk<
    readonly ConsultationDTO[],
    void,
    AppThunkApiConfig
>("consultation/fetchAll", async (_, { extra, rejectWithValue }) => {
    try {
        return await extra.consultation.getAllConsultations();
    } catch (error) {
        return rejectWithValue(getErrorMessage(error, "Failed to load consultations"));
    }
});

export const updateConsultationStatus = createAsyncThunk<
    ConsultationDTO,
    { id: string; status: ConsultationStatus },
    AppThunkApiConfig
>("consultation/updateStatus", async ({ id, status }, { extra, rejectWithValue }) => {
    try {
        return await extra.consultation.updateConsultationStatus(id, status);
    } catch (error) {
        return rejectWithValue(getErrorMessage(error, "Failed to update consultation status"));
    }
});

export const deleteConsultation = createAsyncThunk<string, string, AppThunkApiConfig>(
    "consultation/delete",
    async (id, { extra, rejectWithValue }) => {
        try {
            await extra.consultation.deleteConsultation(id);
            return id;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "Failed to delete consultation"));
        }
    },
);
