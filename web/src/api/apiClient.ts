import axios from "axios";
import { ApiMultipleResponse, ApiSingleResponse } from "./apiResponses";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

axios.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    console.log("intercepted error: ", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response) => {
    console.log("successful response: ", response);
    return response;
  },
  (error) => {
    if (error.response) {
      console.log("error response: ", error.response);
      throw error.response;
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

  getAll = async (): Promise<ApiMultipleResponse<T>> => {
    try {
      const response = await axiosInstance.get(this.endpoint, {
        params: { ...this.params },
      });
      console.log("data: ", [...response.data.content]);
      return Promise.resolve({
        data: {
          content: [...response.data.content],
          error: { status: 0, message: "" },
        },
      });
    } catch (error: any) {
      return Promise.reject({
        data: {
          content: {} as T,
          error: { status: error.data.status, message: error.data.message },
        },
      });
    }
  };

  get = async (id: number | string): Promise<ApiSingleResponse<T>> => {
    try {
      const response = await axiosInstance.get(this.endpoint + "/" + id);
      return Promise.resolve({
        data: {
          content: { ...response.data },
          error: { status: 0, message: "" },
        },
      });
    } catch (error: any) {
      return Promise.reject({
        data: {
          content: {} as T,
          error: { status: error.data.status, message: error.data.message },
        },
      });
    }
  };

  post = async (entity: T | {}): Promise<ApiSingleResponse<T>> => {
    try {
      const response = await axiosInstance.post(this.endpoint, entity);
      return Promise.resolve({
        data: {
          content: { ...response.data },
          error: { status: 0, message: "" },
        },
      });
    } catch (error: any) {
      console.log("apiClient: error", error);
      return Promise.reject({
        data: {
          content: {} as T,
          error: { status: error.data.status, message: error.data.message },
        },
      });
    }
  };
}

export default ApiClient;
