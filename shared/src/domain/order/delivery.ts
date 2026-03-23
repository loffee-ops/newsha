import { DELIVERY_METHOD } from "./constants";

type RecipientBase = {
    firstName: string;
    lastName: string;
    middleName?: string;
    phone: string;
};

export type WarehouseDelivery = RecipientBase & {
    method: typeof DELIVERY_METHOD.Warehouse;
    city: string;
    warehouse: string;
};

export type PostomatDelivery = RecipientBase & {
    method: typeof DELIVERY_METHOD.Postomat;
    city: string;
    postomat: string;
    address?: string;
};

export type CourierDelivery = RecipientBase & {
    method: typeof DELIVERY_METHOD.Courier;
    city: string;
    address: string;
};

export type DeliveryInfo = WarehouseDelivery | PostomatDelivery | CourierDelivery;
