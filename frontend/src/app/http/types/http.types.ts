export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type QueryValue = string | number | boolean | null | undefined;
export type QueryParams = Record<string, QueryValue | QueryValue[]>;

export interface HttpRequest<TBody = unknown> {
    url: string;
    method?: HttpMethod;
    query?: QueryParams;
    body?: TBody;
    headers?: HeadersInit;
    timeout?: number;
}

export interface HttpResponse<T = unknown> {
    status: number;
    data: T;
    headers: Headers;
}

export interface RawHttpResponse {
    status: number;
    data: unknown;
    headers: Headers;
}
