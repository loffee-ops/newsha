export const SYNC_SOURCES = {
    OneC: "1C",
    CRM: "CRM",
    NovaPoshta: "NovaPoshta",
} as const;

export type SyncSource = (typeof SYNC_SOURCES)[keyof typeof SYNC_SOURCES];

export const SYNC_ENTITIES = {
    Product: "product",
    Category: "category",
    Order: "order",
    Customer: "customer",
    Warehouse: "warehouse",
    Shipment: "shipment",
} as const;

export type SyncEntity = (typeof SYNC_ENTITIES)[keyof typeof SYNC_ENTITIES];

export const SYNC_STATUSES = {
    Idle: "idle",
    Running: "running",
    Success: "success",
    Error: "error",
} as const;

export type SyncStatus = (typeof SYNC_STATUSES)[keyof typeof SYNC_STATUSES];
