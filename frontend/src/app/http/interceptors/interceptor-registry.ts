import type { HttpRequest, RawHttpResponse } from "@/app/http/types";

export type RequestInterceptor = <TBody = unknown>(
    req: HttpRequest<TBody>,
) => HttpRequest<TBody> | Promise<HttpRequest<TBody>>;

export type ResponseInterceptor = (
    res: RawHttpResponse,
) => RawHttpResponse | Promise<RawHttpResponse>;

const requestInterceptors = new Set<RequestInterceptor>();
const responseInterceptors = new Set<ResponseInterceptor>();

export function addRequestInterceptor(interceptor: RequestInterceptor): () => void {
    requestInterceptors.add(interceptor);

    return () => {
        requestInterceptors.delete(interceptor);
    };
}

export function addResponseInterceptor(interceptor: ResponseInterceptor): () => void {
    responseInterceptors.add(interceptor);

    return () => {
        responseInterceptors.delete(interceptor);
    };
}

export function getRequestInterceptors(): readonly RequestInterceptor[] {
    return Array.from(requestInterceptors);
}

export function getResponseInterceptors(): readonly ResponseInterceptor[] {
    return Array.from(responseInterceptors);
}
