import { HttpError } from "./httpError";

export interface HttpClientOptions {
  baseUrl: string;
  defaultHeaders?: HeadersInit;
}

export class HttpClient {
  private readonly baseUrl: string;
  private readonly defaultHeaders?: HeadersInit;

  constructor(options: HttpClientOptions) {
    this.baseUrl = options.baseUrl;
    this.defaultHeaders = options.defaultHeaders;
  }

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...this.defaultHeaders,
        ...init?.headers,
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new HttpError(response.status, response.statusText, errorBody);
    }

    return response.json() as Promise<T>;
  }

  protected async get<T>(path: string, init?: RequestInit) {
    return await this.request<T>(path, { ...init, method: "GET" });
  }

  protected async post<T>(path: string, body?: unknown, init?: RequestInit): Promise<T> {
    return await this.request<T>(path, {
      ...init,
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  protected async put<T>(path: string, body?: unknown, init?: RequestInit) {
    return await this.request<T>(path, {
      ...init,
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  protected async delete<T>(path: string, init?: RequestInit) {
    return await this.request<T>(path, { ...init, method: "DELETE" });
  }
}
