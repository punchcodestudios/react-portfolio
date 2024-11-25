import NodeApiClient from "./node-api-client";

export interface User {
  username: string;
  password: string;
}

export default new NodeApiClient<User>("/auth/signin");
