import { useQuery } from "@tanstack/react-query";
// import platforms from "../data/platforms";
import APIClient from "../services/node-api-client";
// import ms from "ms";
import { LoginUser } from "../entities/User";
import { FetchResponse } from "@/entities/FetchResponse";

const apiClient = new APIClient<LoginUser>("/api/auth/me");

const useLoginUser = (user: LoginUser) =>
  useQuery<FetchResponse<LoginUser>, Error>({
    queryKey: ["login_user"],
    queryFn: apiClient.post({ email: user.email, password: user.password }),
    staleTime: 24 * 60 * 60 * 1000,
    // initialData: { count: platforms.length, results: platforms },
  });

export default useLoginUser;
