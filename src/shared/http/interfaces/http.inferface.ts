export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers?: any;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

export interface AxiosError {
  response?: {
    data?: any;
    status: number;
    statusText: string;
  };
  message: string;
  code?: string;
}
