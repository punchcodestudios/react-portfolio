import type { ApiErrorResponse, MetaResponse } from "./api";

export interface ExamMeta extends MetaResponse {}

export interface EvaluationItem {
  evaluation_item_id: string;
  question: string;
  source: string;
  options: string[];
  answer: string[];
}

export interface Exam {
  learning_path_id: string;
  learning_path_evaluation_items: EvaluationItem[];
}

export interface ExamResponse {
  target: Exam[];
  meta: ExamMeta;
  error: ApiErrorResponse;
}

export interface ExamRequest {
  params: {
    learning_path_id: string;
  };
}

export interface SeedExamRequest {
  params: {
    body: Exam[];
  };
}
