import type { ApiResponse } from "~/entities/api";
import type {
  Exam,
  ExamRequest,
  ExamResponse,
  SeedExamRequest,
} from "~/entities/exam";

import { getAllExams, seedExams } from "~/api/examApi";

const ExamService = {
  getAllExams: async (request: ExamRequest) => {
    try {
      const response = await getAllExams(request);
      return Promise.resolve(mapExams(response));
    } catch (error) {
      throw error;
    }
  },
  seedExams: async (request: SeedExamRequest) => {
    try {
      const response = await seedExams(request);
      return Promise.resolve(mapExams(response));
    } catch (error) {
      throw error;
    }
  },
};

export { ExamService };

const mapExams = (item: ApiResponse<Exam>): ExamResponse => {
  const res = {
    target: item.content.target,
    meta: item.content.meta,
    error: item.content.error,
  } as ExamResponse;

  return res;
};
