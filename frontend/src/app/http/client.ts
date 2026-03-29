import { normalizeError } from "@/app/error/lib";
import {
    HttpError,
    NetworkError,
    NotFoundError,
    ForbiddenError,
    TimeoutError,
    UnauthorizedError,
} from "@/app/http/errors";
import { getRequestInterceptors, getResponseInterceptors } from "@/app/http/interceptors";
import type { HttpRequest, HttpResponse, QueryValue, RawHttpResponse } from "@/app/http/types";
import { ENV } from "@/shared/config/env";

function appendQueryValue(params: URLSearchParams, key: string, value: QueryValue): void {
    if (value === null || value === undefined) {
        return;
    }

    params.append(key, String(value));
}

function buildUrl(url: string, query?: HttpRequest["query"]): string {
    const fullUrl = `${ENV.API_URL}${url}`;

    if (!query) {
        return fullUrl;
    }

    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(query)) {
        if (Array.isArray(value)) {
            for (const item of value) {
                appendQueryValue(params, key, item);
            }

            continue;
        }

        appendQueryValue(params, key, value);
    }

    const queryString = params.toString();

    return queryString ? `${fullUrl}?${queryString}` : fullUrl;
}

async function parseResponseData(res: Response): Promise<unknown> {
    if (res.status === 204) {
        return null;
    }

    const contentType = res.headers.get("content-type") ?? "";

    if (contentType.includes("application/json")) {
        try {
            return await res.json();
        } catch {
            return null;
        }
    }

    try {
        const text = await res.text();
        return text.length > 0 ? text : null;
    } catch {
        return null;
    }
}

function createHttpError(status: number, message: string, data?: unknown): HttpError {
    if (status === 401) {
        return new UnauthorizedError(data);
    }

    if (status === 403) {
        return new ForbiddenError(data);
    }

    if (status === 404) {
        return new NotFoundError(data);
    }

    return new HttpError(status, message, data);
}

export async function http<T = unknown, TBody = unknown>(
    config: HttpRequest<TBody>,
): Promise<HttpResponse<T>> {
    let request: HttpRequest<TBody> = { ...config };

    try {
        for (const interceptor of getRequestInterceptors()) {
            request = await interceptor(request);
        }

        if (typeof navigator !== "undefined" && !navigator.onLine) {
            throw new NetworkError();
        }

        const url = buildUrl(request.url, request.query);
        const method = request.method ?? "GET";
        const timeout = request.timeout ?? 15_000;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const hasBody = request.body !== undefined && method !== "GET" && method !== "DELETE";
        const isFormData = typeof FormData !== "undefined" && request.body instanceof FormData;

        const fetchConfig: RequestInit = {
            method,
            headers: {
                ...(!isFormData && hasBody ? { "Content-Type": "application/json" } : {}),
                ...request.headers,
            },
            signal: controller.signal,
            credentials: "include",
        };

        if (hasBody) {
            fetchConfig.body = isFormData
                ? (request.body as FormData)
                : JSON.stringify(request.body);
        }

        let res: Response;

        try {
            res = await fetch(url, fetchConfig);
        } catch (error) {
            clearTimeout(timeoutId);

            if (error instanceof DOMException && error.name === "AbortError") {
                throw new TimeoutError();
            }

            throw new NetworkError(error);
        } finally {
            clearTimeout(timeoutId);
        }

        const data = await parseResponseData(res);

        let raw: RawHttpResponse = {
            status: res.status,
            data,
            headers: res.headers,
        };

        for (const interceptor of getResponseInterceptors()) {
            raw = await interceptor(raw);
        }

        if (raw.status < 200 || raw.status >= 300) {
            throw createHttpError(
                raw.status,
                typeof raw.data === "object" &&
                    raw.data !== null &&
                    "message" in raw.data &&
                    typeof (raw.data as { message?: unknown }).message === "string"
                    ? (raw.data as { message: string }).message
                    : res.statusText || "HTTP error",
                raw.data,
            );
        }

        return {
            status: raw.status,
            data: raw.data as T,
            headers: raw.headers,
        };
    } catch (error) {
        throw normalizeError(error);
    }
}
