import { createAsyncThunk } from "@reduxjs/toolkit";

import type { CooperationLeadDTO } from "@shared/contracts/cooperation";
import type { CooperationDTO } from "@shared/contracts/cooperation/cooperation.dto";
import type { CooperationStatus } from "@shared/domain/cooperation";
import type { ID } from "@shared/primitives";

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

export const submitCooperation = createAsyncThunk<
    CooperationDTO,
    CooperationLeadDTO,
    AppThunkApiConfig
>("cooperation/submit", async (payload, { extra, rejectWithValue }) => {
    try {
        return await extra.cooperation.createCooperation(payload);
    } catch (error) {
        return rejectWithValue(getErrorMessage(error, "Failed to submit cooperation request"));
    }
});

export const fetchCooperations = createAsyncThunk<
    readonly CooperationDTO[],
    void,
    AppThunkApiConfig
>("cooperation/fetchAll", async (_, { extra, rejectWithValue }) => {
    try {
        return await extra.cooperation.getAllCooperations();
    } catch (error) {
        return rejectWithValue(getErrorMessage(error, "Failed to load cooperation requests"));
    }
});

export const updateCooperationStatus = createAsyncThunk<
    CooperationDTO,
    { id: ID; status: CooperationStatus },
    AppThunkApiConfig
>("cooperation/updateStatus", async ({ id, status }, { extra, rejectWithValue }) => {
    try {
        return await extra.cooperation.updateCooperationStatus(id, status);
    } catch (error) {
        return rejectWithValue(getErrorMessage(error, "Failed to update cooperation status"));
    }
});

export const deleteCooperation = createAsyncThunk<ID, ID, AppThunkApiConfig>(
    "cooperation/delete",
    async (id, { extra, rejectWithValue }) => {
        try {
            await extra.cooperation.deleteCooperation(id);
            return id;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "Failed to delete cooperation request"));
        }
    },
);
