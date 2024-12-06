import axios from "axios";
import {} from "dotenv/config";

const axiosInstance = axios.create({
  baseURL:
    "mongodb://pcs_user:512b81c9-f342-4465-894a-857d8c89c180@iad2-c17-1.mongo.objectrocket.com:52770/pcs_react_db?ssl=true",
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
  params: object;

  constructor(endpoint: string, params?: object) {
    this.endpoint = endpoint;
    this.params = params || {};
  }

  getAll = (): Promise<T> => {
    console.log("API: ", { ...this.params });
    return axiosInstance
      .get<T>(this.endpoint, { params: { ...this.params } })
      .then((res) => res.data);
  };

  get = (id: number | string): Promise<T> => {
    return axiosInstance
      .get<T>(this.endpoint + "/" + id)
      .then((res) => res.data);
  };

  post = async (entity: T | {}): Promise<T> => {
    // console.log("CLIENT ITEM: ", entity);
    return await axiosInstance
      .post(this.endpoint, entity)
      .then((res) => res.data);
  };
}

export default NodeAPIClient;
