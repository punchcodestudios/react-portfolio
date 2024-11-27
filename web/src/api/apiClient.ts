import axios from "axios";
import { FetchResponse } from "../entities/FetchResponse";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/",
  withCredentials: true,
});

axios.interceptors.request.use(
  async (config) => {
    // console.log("request", config);
    return config;
  },
  (error) => {
    console.log("intercepted error: ", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response) => {
    // console.log("response from interceptor: ", response);
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("error response: status==401");
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
    return axiosInstance.get<T>(this.endpoint).then((res) => res.data);
  };

  get = (id: number | string) => {
    return axiosInstance
      .get<T>(this.endpoint + "/" + id)
      .then((res) => res.data);
  };

  post = async (entity: T | {}) => {
    console.log("CLIENT ITEM: ", entity);
    return await axiosInstance
      .post(this.endpoint, entity)
      .then((res) => res.data);
  };
}

export default NodeAPIClient;
