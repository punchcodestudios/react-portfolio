import React, { useEffect } from "react";
import { createContext, useContext } from "react";

export type LearningPathEvaluationItem = {
  evaluation_item_id: string;
  question: string;
  source: string;
  options: string[];
  answer: string[];
};

export type Exam = {
  _id: string;
  title: string;
  learning_path_id: string;
  learning_path_evaluation_items: LearningPathEvaluationItem[];
};

export interface ExamContextType {
  data: Exam[];
  setData: React.Dispatch<React.SetStateAction<Exam[]>>;
  currentSectionIndex: number;
  setCurrentSectionIndex: React.Dispatch<React.SetStateAction<number>>;
  currentEvaluationItem: LearningPathEvaluationItem | null;
  setCurrentEvaluationItem: React.Dispatch<
    React.SetStateAction<LearningPathEvaluationItem | null>
  >;
  workingEvaluationItems: LearningPathEvaluationItem[];
  setWorkingEvaluationItems: React.Dispatch<
    React.SetStateAction<LearningPathEvaluationItem[]>
  >;
  numberOfTries: number;
  setNumberOfTries: React.Dispatch<React.SetStateAction<number>>;
  randomIndex: number;
  setRandomIndex: React.Dispatch<React.SetStateAction<number>>;
  numberOfQuestions: number;
  setNumberOfQuestions: React.Dispatch<React.SetStateAction<number>>;
}

const ExamContext = createContext<ExamContextType | undefined>(undefined);

export function useExamContext() {
  const context = useContext(ExamContext);
  if (!context) {
    throw new Error(
      "useExamContext must be used within an ExamContextProvider"
    );
  }
  return context as ExamContextType;
}

interface ExamContextProviderProps {
  initialData: Exam[];
  children: React.ReactNode;
}

export function ExamContextProvider({
  initialData,
  children,
}: ExamContextProviderProps) {
  const [data, setData] = React.useState<Exam[]>(initialData);
  const [currentSectionIndex, setCurrentSectionIndex] =
    React.useState<number>(-1);
  const [workingEvaluationItems, setWorkingEvaluationItems] = React.useState<
    LearningPathEvaluationItem[]
  >([]);
  const [currentEvaluationItem, setCurrentEvaluationItem] =
    React.useState<LearningPathEvaluationItem | null>(null);
  const [numberOfTries, setNumberOfTries] = React.useState<number>(0);
  const [randomIndex, setRandomIndex] = React.useState<number>(0);
  const [numberOfQuestions, setNumberOfQuestions] = React.useState<number>(0);

  useEffect(() => {
    if (currentSectionIndex < 0) {
      setWorkingEvaluationItems([]);
    }
    if (currentSectionIndex >= data.length) {
      setCurrentSectionIndex(0);
    }
    if (data[currentSectionIndex]) {
      setWorkingEvaluationItems(
        data[currentSectionIndex].learning_path_evaluation_items || []
      );
    }
  }, [currentSectionIndex]);

  return (
    <ExamContext.Provider
      value={{
        data,
        setData,
        currentSectionIndex,
        setCurrentSectionIndex,
        currentEvaluationItem,
        setCurrentEvaluationItem,
        workingEvaluationItems,
        setWorkingEvaluationItems,
        numberOfTries,
        setNumberOfTries,
        randomIndex,
        setRandomIndex,
        numberOfQuestions,
        setNumberOfQuestions,
      }}
    >
      {children}
    </ExamContext.Provider>
  );
}
