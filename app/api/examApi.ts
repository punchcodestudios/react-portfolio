import type { ApiResponse } from "~/entities/api";
import type { Exam, ExamRequest, SeedExamRequest } from "~/entities/exam";
import ApiClient from "./apiClient";

export const getAllExams = async (
  request: ExamRequest
): Promise<ApiResponse<Exam>> => {
  const client = new ApiClient<Exam>("exam/get-all-exams", {
    params: request.params,
  });
  try {
    return client.getAll().then((response) => {
      return Promise.resolve(response);
    });
  } catch (error: any) {
    return Promise.resolve(error);
  }
};

export const seedExams = async (
  request: SeedExamRequest
): Promise<ApiResponse<Exam>> => {
  const client = new ApiClient<Exam>("exam/seed-exams", {
    params: request.params,
  });
  try {
    return client.post(request.params.body).then((response) => {
      return Promise.resolve(response);
    });
  } catch (error: any) {
    return Promise.resolve(error);
  }
};
