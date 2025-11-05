import type { ExamResponse } from "~/entities/exam";
import examService from "~/service/exam-service";

export type LearningPathEvaluationItem = {
  evaluation_item_id: string;
  question: string;
  source: string;
  options: string[];
  answer: string[];
};

export type Exam = {
  learning_path_id: string;
  learning_path_evaluation_items: LearningPathEvaluationItem[];
};

export type ExamList = {
  [key: string]: ExamResponse;
};

const examCache = new Map<string, Promise<ExamResponse>>();

export const getAllExams = (): Promise<ExamResponse> => {
  const cached = examCache.get("all") ?? getAllExamsImplementation();
  if (!cached) {
    console.error(`No cached exam sections found for exam: all`);
  }
  examCache.set("all", cached);
  return cached;
};

async function getAllExamsImplementation(): Promise<ExamResponse> {
  console.log("getAllExamsImplementation called");
  const response = await examService.getAllExams({
    params: { learning_path_id: "all" },
  });
  const examList: ExamResponse = response;

  if (!response.meta.success) {
    throw new Error("Failed to fetch all exams");
  }
  return examList;
}
