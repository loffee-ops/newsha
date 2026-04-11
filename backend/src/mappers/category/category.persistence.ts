import type { Types } from "mongoose";

export type CategoryPersistence = {
    _id: Types.ObjectId;
    name: string;
    nameEn: string;
    nameUa: string;
    slug: string;
    image?: string | null;
    description?: string | null;
    parentId?: Types.ObjectId | null;
    isActive: boolean;
    order: number;
    showOnHome?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};