import axios, { AxiosError, type AxiosResponse } from "axios";
import type { ApiErrorResponse, ApiResponse } from "~/entities/api";
import type { GlobalError } from "~/entities/error";

const axiosInstance = axios.create({
  baseURL: "https://punchcodestudios-api-2cbe706bb11a.herokuapp.com/api", // "http://localhost:3000/api",
  withCredentials: false,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    console.log("🔍 API Request:", config.method?.toUpperCase(), config.url);
    console.log("🔍 Request headers:", config.headers);
    return config;
  },
  (error) => {
    console.error("💥 Request interceptor error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response: AxiosResponse) => {
    console.log("✅ API Response:", response.status, response.config.url);
    return response;
  },
  (error: AxiosError) => {
    console.error("💥 Response interceptor error:", {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      url: error.config?.url,
    });

    let errorMessage: string;
    let errorCode: string;

    if (error.code === "ENOTFOUND") {
      errorMessage = `Cannot resolve domain: API server unreachable`;
      errorCode = "NETWORK_UNREACHABLE";
    } else if (error.code === "ECONNREFUSED") {
      errorMessage = `Connection refused: API server is down`;
      errorCode = "CONNECTION_REFUSED";
    } else if (error.code === "ETIMEDOUT") {
      errorMessage = `Request timeout: API server did not respond`;
      errorCode = "REQUEST_TIMEOUT";
    } else {
      errorMessage = error.message || "Unknown network error";
      errorCode = error.code || "UNKNOWN_ERROR";
    }

    const apiError = new Error(errorMessage);
    apiError.name = "NetworkError";

    (apiError as any).code = errorCode;
    (apiError as any).originalCode = error.code;
    (apiError as any).status = error.response?.status || 0;
    (apiError as any).url = error.config?.url;
    (apiError as any).timestamp = new Date().toISOString();

    return Promise.reject(apiError);
  }
);

class ApiClient<T> {
  endpoint: string;
  params: object;
  headers: object;

  constructor(endpoint: string, params?: object, headers?: object) {
    this.endpoint = endpoint;
    this.params = params || {};
    this.headers = headers || {};
  }

  getAll = async (): Promise<ApiResponse<T>> => {
    try {
      // console.log("🔍 ApiClient.getAll:", this.endpoint);
      // console.log("🔍 Params:", this.params);
      // console.log("🔍 Headers:", this.headers);
      const response = await axiosInstance.get(this.endpoint, {
        headers: { ...this.headers },
        params: { ...this.params },
      });
      console.log("✅ ApiClient.getAll success");
      return Promise.resolve({ ...response.data });
    } catch (error: any) {
      throw error;
    }
  };

  get = async (id: number | string): Promise<ApiResponse<T>> => {
    try {
      // console.log("endpoint: ", this.endpoint + "/" + id);
      const response = await axiosInstance.get(this.endpoint + "/" + id);
      return Promise.resolve({ ...response.data });
    } catch (error: any) {
      //console.log("apiClient.get: error", error);
      return Promise.reject({ ...error } as ApiErrorResponse);
    }
  };

  put = async (id: number | string, entity: T): Promise<ApiResponse<T>> => {
    try {
      const response = await axiosInstance.put(
        this.endpoint + "/" + id,
        entity
      );
      return Promise.resolve({ ...response.data });
    } catch (error: any) {
      // console.log("apiClient.put: error", error);
      return Promise.reject({ ...error } as ApiErrorResponse);
    }
  };

  post = async (entity: T | {}): Promise<ApiResponse<T>> => {
    try {
      const response = await axiosInstance.post(this.endpoint, entity);
      return Promise.resolve({ ...response.data });
    } catch (error: any) {
      // console.log("apiClient.post: error", error);
      return Promise.reject({ ...error } as ApiErrorResponse);
    }
  };

  delete = async (id: number | string): Promise<ApiResponse<T>> => {
    try {
      const response = await axiosInstance.delete(this.endpoint + "/" + id);
      return Promise.resolve({ ...response.data });
    } catch (error: any) {
      // console.log("apiClient.delete: error", error);
      return Promise.reject({ ...error } as ApiErrorResponse);
    }
  };
}

export default ApiClient;
