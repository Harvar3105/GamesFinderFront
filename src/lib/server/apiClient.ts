import "server-only";

import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

// FIXME: [Stage1] Add a BackendClient on top of this class: it sends the session access token as a Bearer
// header and on 401 refreshes the tokens once and retries. Identity rejects access tokens right after a role
// change (security stamp check), so 401 is expected during normal use.
export default abstract class ApiClient {
  protected readonly client: AxiosInstance;

  protected constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  protected async get<TResponse>(url: string, config?: AxiosRequestConfig): Promise<TResponse> {
    const response = await this.client.get<TResponse>(url, config);

    return response.data;
  }

  protected async post<TResponse, TBody = unknown>(
    url: string,
    data?: TBody,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> {
    const response = await this.client.post<TResponse>(url, data, config);

    return response.data;
  }

  protected async put<TResponse, TBody = unknown>(
    url: string,
    data?: TBody,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> {
    const response = await this.client.put<TResponse>(url, data, config);

    return response.data;
  }

  protected async patch<TResponse, TBody = unknown>(
    url: string,
    data?: TBody,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> {
    const response = await this.client.patch<TResponse>(url, data, config);

    return response.data;
  }

  protected async delete<TResponse>(url: string, config?: AxiosRequestConfig): Promise<TResponse> {
    const response = await this.client.delete<TResponse>(url, config);

    return response.data;
  }
}
