import axios, { AxiosError } from "axios";
import ApiClient from "~/api/apiClient";
import type { ApiResponse } from "~/entities/api";
import type { Experience, Resume } from "~/entities/resume";

export const getHttp = async (): Promise<ApiResponse<Experience>> => {
  const client = new ApiClient<Experience>("/resume/get-all-experience");
  try {
    const response = await client.getAll();
    // console.log("gettHttp.response: ", response);
    return Promise.resolve(response);
  } catch (error) {
    // console.log("getHttp.error: ", error);
    return Promise.reject({ data: { message: "error" } });
  }
};

export const getHttpFailure = async (): Promise<ApiResponse<Experience>> => {
  const client = new ApiClient<Experience>("/resume/get-all-experience");
  try {
    const response = await client.getAll();
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject({ data: { message: "error" } });
  }
};

export const getAllExperience = async (): Promise<ApiResponse<Experience>> => {
  const client = new ApiClient<Experience>("/resume/get-all-experience");
  const response = await client.getAll();
  return response;
};
