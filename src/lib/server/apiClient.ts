import "server-only";

import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { toQueryString } from "@/lib/toQueryString";

export default abstract class ApiClient {
  protected readonly client: AxiosInstance;

  protected constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
      // axios writes arrays as tags[]=a, which ASP.NET does not bind.
      paramsSerializer: { serialize: (params) => toQueryString(params).toString() },
    });
  }

  protected async request<TResponse>(config: AxiosRequestConfig): Promise<TResponse> {
    const response = await this.client.request<TResponse>(config);

    return response.data;
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
