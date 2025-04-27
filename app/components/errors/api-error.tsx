import type { ApiErrorResponse } from "~/entities/api";

const ApiError = ({ error }: { error: ApiErrorResponse }) => {
  return (
    <div className="container mx-auto flex flex-col h-full w-full items-center justify-center bg-siteWhite p-20 text-h2">
      <h2>{error.status}</h2>
      <h4>{error.message}</h4>
    </div>
  );
};

export default ApiError;
