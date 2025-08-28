/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/only-throw-error */
import { Injectable, Inject } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { ApiError, ApiResponse } from './interfaces/http.inferface';

@Injectable()
export class CustomHttpService {
  constructor(
    private readonly httpService: HttpService,
    @Inject('HTTP_TIMEOUT') private readonly timeout: number = 10000,
  ) {}

  async request<T = any>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await firstValueFrom(
        this.httpService.request({
          timeout: this.timeout,
          ...config,
        }),
      );

      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };
    } catch (error) {
      if (error.response) {
        throw {
          message: error.response.data?.message || 'HTTP Error',
          status: error.response.status,
          code: error.code,
        } as ApiError;
      }
      throw {
        message: error.message || 'Network Error',
        status: 0,
        code: error.code,
      } as ApiError;
    }
  }

  async get<T = any>(url: string): Promise<ApiResponse<T>> {
    try {
      const observable = this.httpService.get<T>(url);
      const response = await firstValueFrom(observable);

      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request({ method: 'POST', url, data, ...config });
  }

  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request({ method: 'PUT', url, data, ...config });
  }

  async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request({ method: 'DELETE', url, ...config });
  }

  private handleError(error: any): Error {
    if (error.response) {
      return new Error(
        `HTTP Error: ${error.response.status} - ${error.response.statusText}`,
      );
    }
    return new Error('Network error');
  }
}
