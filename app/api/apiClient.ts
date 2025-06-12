import axios, { AxiosError } from "axios";
import type { ApiErrorResponse, ApiResponse } from "~/entities/api";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

axios.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    // set up logging for this level
    // console.log("intercepted error: ", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // set up logging for this level
      //console.log("error response: ", error.response.data);
      throw error.response.data;
    }
    throw error;
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
      // console.log("headers: ", this.headers);
      const response = await axiosInstance.get(this.endpoint, {
        headers: { ...this.headers },
        params: { ...this.params },
      });
      return Promise.resolve({ ...response.data });
    } catch (error: any) {
      console.log("apiClient.getAll: error", { error });
      if (typeof error == "string") {
        return Promise.reject(error);
      }
      if (error instanceof AxiosError) {
        // console.log("axios error: ", error);
        return Promise.reject(error);
      }
      return Promise.reject({ ...error } as ApiErrorResponse);
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

  post = async (entity: T | {}): Promise<ApiResponse<T>> => {
    try {
      const response = await axiosInstance.post(this.endpoint, entity);
      return Promise.resolve({ ...response.data });
    } catch (error: any) {
      // console.log("apiClient.post: error", error);
      return Promise.reject({ ...error } as ApiErrorResponse);
    }
  };
}

export default ApiClient;
