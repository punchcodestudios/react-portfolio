import React, { use, useEffect, useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useLoaderData } from "react-router";
import {
  ExamContextProvider,
  useExamContext,
} from "~/components/exam/examContext";
import { Button } from "~/components/ui/button";
import { GenericErrorBoundary } from "~/components/error/generic-error-boundary";
import { Loader } from "~/components/ui/loader";
// this is a problem. there are multiple interfaces exported. Please make a decision on where these things live
import type { EvaluationItem, Exam } from "~/entities/exam";
import { getAllExams } from "~/utils/exam";
import { getRandomNumber } from "~/utils/site";

const ExamContent = () => {
  const {
    data,
    workingEvaluationItems,
    setWorkingEvaluationItems,
    numberOfTries,
    setNumberOfTries,
    randomIndex,
    setRandomIndex,
    numberOfQuestions,
    setNumberOfQuestions,
  } = useExamContext();
  // console.log("data from context: ", data);

  // Set workingItems only once when response loads
  useEffect(() => {
    if (data[randomIndex]?.learning_path_evaluation_items) {
      setWorkingEvaluationItems((prevItems) => [
        ...prevItems,
        ...data[1].learning_path_evaluation_items,
      ]);
      setNumberOfQuestions(data[1].learning_path_evaluation_items.length);
    }
  }, [data]);

  const getNewItem = () => {
    if (workingEvaluationItems.length === 0) {
      return;
    }
    setRandomIndex(getRandomNumber(workingEvaluationItems.length));
  };

  const handleCorrectAnswer = () => {
    setNumberOfTries(numberOfTries + 1);
    const workingItems = [...workingEvaluationItems];
    workingItems.splice(randomIndex, 1);
    setWorkingEvaluationItems(workingItems);
    getNewItem();
  };

  const handleIncorrectAnswer = () => {
    setNumberOfTries(numberOfTries + 1);
    getNewItem();
  };

  return (
    <div className="flex flex-col justify-center items-center w-full mt-8">
      <h1>Az-204 Exam Prep</h1>
      <select className="text-siteBlack">
        <option value={0}>Choose a section</option>
        {data &&
          data.map((exam, index) => (
            <option key={exam._id} value={index + 1} className="text-siteBlack">
              {exam.title}
            </option>
          ))}
      </select>
      <div className="flex flex-row justify-center items-center w-[90%] md:w-[50vw] h-full">
        {workingEvaluationItems.length > 0 && (
          <FlashCard
            evaluationItem={workingEvaluationItems[randomIndex]}
            title={"Azure Services Title"}
            handleCorrectAnswer={handleCorrectAnswer}
            handleIncorrectAnswer={handleIncorrectAnswer}
            numberOfQuestions={numberOfQuestions}
            numberOfTries={numberOfTries}
          />
        )}
        {workingEvaluationItems.length === 0 && (
          <div className="w-full h-full flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold">No more questions available</h2>
            <p className="mt-4">
              You have answered all the questions in this section.
            </p>
            <div className="p-5 mt-5 bg-slate-200 w-full text-center">
              <div className="m-2 text-lg">
                {`Number of Questions: ${numberOfQuestions}`}
              </div>
              <div className="m-2 text-lg">
                {`Number of Tries: ${numberOfTries}`}
              </div>
              <div className="m-2 text-lg">
                {`Your score : ${(numberOfQuestions / numberOfTries) * 100} %`}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export async function loader() {
  const initData: Exam[] = await getAllExams().then((response) => {
    if (!response) {
      throw new Error("Failed to fetch exam data");
    }

    return response.target;
  });
  return {
    initData: initData,
  };
}

const ExamContainer = () => {
  const { initData } = useLoaderData();

  return (
    <ErrorBoundary fallback={<GenericErrorBoundary />}>
      <React.Suspense fallback={<Loader />}>
        <ExamContextProvider initialData={[...initData]}>
          <ExamContent />
        </ExamContextProvider>
      </React.Suspense>
    </ErrorBoundary>
  );
};

type FlashCardProps = {
  title: string;
  evaluationItem: EvaluationItem;
  handleCorrectAnswer: () => void;
  handleIncorrectAnswer: () => void;
  numberOfQuestions: number;
  numberOfTries: number;
};

const FlashCard: React.FC<FlashCardProps> = ({
  title,
  evaluationItem,
  handleCorrectAnswer,
  handleIncorrectAnswer,
  numberOfQuestions,
  numberOfTries,
}: FlashCardProps) => {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const handleCorrectClick = () => {
    if (detailsRef.current) {
      detailsRef.current.open = false;
    }
    handleCorrectAnswer();
  };

  const handleIncorrectClick = () => {
    if (detailsRef.current) {
      detailsRef.current.open = false;
    }
    handleIncorrectAnswer();
  };

  return (
    <div className="w-full border border-rounded-lg p-2 lg:p-4 shadow-md mt-5">
      <details ref={detailsRef}>
        <summary className="font-header text-2xl mb-4">
          {evaluationItem.question}
        </summary>
        <ul className="bg-slate-200 p-5">
          {evaluationItem.answer.map((option, index) => (
            <li key={index} className="font-header text-xl mb-5">
              {option}
            </li>
          ))}
        </ul>
        <div className="flex flex-row justify-between mt-5">
          <div className="w-[45%]">
            <Button onClick={handleIncorrectClick} variant="error">
              Incorrect
            </Button>
          </div>
          <div className="w-[45%]">
            <Button onClick={handleCorrectClick} variant="success">
              Correct
            </Button>
          </div>
        </div>
        <div className="mt-5">
          <a
            href={evaluationItem.source}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sm"
          >{`Reference : ${evaluationItem.source}`}</a>
        </div>
      </details>
    </div>
  );
};

export default ExamContainer;

export function meta() {
  return [
    { title: "Punchcode Studios | Exam Preparation" },
    {
      name: "Exam Preparation",
      content:
        "Exam Preparation page that helps students prepare for their exams effectively.",
    },
  ];
}
