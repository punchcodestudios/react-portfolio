import axios from "axios";
import { FetchResponse } from "../entities/FetchResponse";

const axiosInstance = axios.create({
  baseURL:
    "mongodb://pcs_user:512b81c9-f342-4465-894a-857d8c89c180@iad2-c17-1.mongo.objectrocket.com:52770/pcs_react_db?ssl=true",
  withCredentials: true,
});

axios.interceptors.request.use(
  async (config) => {
    console.log("request", config);
    return config;
  },
  (error) => {
    console.log("intercepted error: ", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response) => {
    console.log("response from interceptor: ", response);
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("call the refresh token here");
    }
    return Promise.reject(error);
  }
);

class NodeAPIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = () => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint)
      .then((res) => res.data);
  };

  get = (id: number | string) => {
    return axiosInstance
      .get<T>(this.endpoint + "/" + id)
      .then((res) => res.data);
  };

  post = async (entity: T | {}) => {
    return await axiosInstance
      .post(this.endpoint, entity)
      .then((res) => res.data);
  };
}

export default NodeAPIClient;
