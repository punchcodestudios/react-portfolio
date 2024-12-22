import axios from "axios";
import { ApiErrorResponse, ApiResponse } from "./apiResponses";

const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api"
      : "https://punchcodestudios-980650c93199.herokuapp.com/api",
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
      // console.log("error response: ", error.response.data);
      throw error.response.data;
    }
    throw error;
  }
);

class ApiClient<T> {
  endpoint: string;
  params: object;

  constructor(endpoint: string, params?: object) {
    this.endpoint = endpoint;
    this.params = params || {};
  }

  getAll = async (): Promise<ApiResponse<T>> => {
    try {
      const response = await axiosInstance.get(this.endpoint, {
        params: { ...this.params },
      });
      return Promise.resolve({ ...response.data });
    } catch (error: any) {
      // console.log("apiClient.getAll: error", error);
      return Promise.reject({ ...error } as ApiErrorResponse);
    }
  };

  get = async (id: number | string): Promise<ApiResponse<T>> => {
    try {
      const response = await axiosInstance.get(this.endpoint + "/" + id);
      return Promise.resolve({ ...response.data });
    } catch (error: any) {
      // console.log("apiClient.get: error", error);
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
