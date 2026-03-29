import { http } from "@/app/http";
import type {
    AdminBannerListResponse,
    AdminBannerResponse,
    DeleteBannerPayload,
    UpdateBannerPayload,
    UploadBannerPayload,
} from "@/entities/banner/types";

export const adminBannerApi = {
    async getAll(params?: { page?: number; limit?: number }): Promise<AdminBannerListResponse> {
        const response = await http<AdminBannerListResponse>({
            url: "/admin/banners",
            method: "GET",
            query: {
                page: params?.page,
                limit: params?.limit,
            },
        });

        return response.data;
    },

    async upload(payload: UploadBannerPayload): Promise<AdminBannerResponse> {
        const formData = new FormData();

        formData.append("file", payload.file);
        formData.append("placement", payload.placement);
        formData.append("variant", payload.variant);

        if (payload.link) formData.append("link", payload.link);
        if (payload.alt) formData.append("alt", payload.alt);
        if (payload.title) formData.append("title", payload.title);
        if (payload.subTitle) formData.append("subTitle", payload.subTitle);
        if (payload.buttonText) formData.append("buttonText", payload.buttonText);
        if (payload.startsAt) formData.append("startsAt", payload.startsAt);
        if (payload.endsAt) formData.append("endsAt", payload.endsAt);

        const response = await http<AdminBannerResponse, FormData>({
            url: "/admin/banners",
            method: "POST",
            body: formData,
        });

        return response.data;
    },

    async update(payload: UpdateBannerPayload): Promise<AdminBannerResponse> {
        const { id, ...body } = payload;

        const response = await http<AdminBannerResponse, Omit<UpdateBannerPayload, "id">>({
            url: `/admin/banners/${id}`,
            method: "PATCH",
            body,
        });

        return response.data;
    },

    async remove(payload: DeleteBannerPayload): Promise<{ ok: true }> {
        const response = await http<{ ok: true }>({
            url: `/admin/banners/${payload.id}`,
            method: "DELETE",
        });

        return response.data;
    },
};
