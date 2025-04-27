import { type JSX } from "react";
import {
  isRouteErrorResponse,
  useParams,
  useRouteError,
  type ErrorResponse,
} from "react-router";
import { getErrorMessage, getStackTrace } from "~/utils/site";

type StatusHandler = (info: {
  error: ErrorResponse;
  params: Record<string, string | undefined>;
}) => JSX.Element | null;

interface Props {
  statusHandlers?: Record<number, StatusHandler>;
  defaultStatusHandler?: StatusHandler;
  unexpectedErrorHandler?: (error: unknown) => JSX.Element | null;
}

export function GenericErrorBoundary({
  statusHandlers,
  defaultStatusHandler = ({ error }) => (
    <>
      <h1>{error.status}</h1>
      <p>{error.data}</p>
    </>
  ),
  unexpectedErrorHandler = (error) => (
    <>
      <h1></h1>
      <p className="text-sm">{getErrorMessage(error)}</p>
      <pre className="w-[90%] whitespace-pre p-4 overflow-x-auto text-xs">
        <code>{getStackTrace(error)}</code>
      </pre>
    </>
  ),
}: Props) {
  const error = useRouteError();
  const params = useParams();

  console.log("typeof document", typeof document);

  if (typeof document !== "undefined") {
    console.error(JSON.stringify(error));
  }

  return (
    <div className="container mx-auto flex flex-col h-full w-full items-center justify-center bg-siteWhite p-20 text-h2">
      {isRouteErrorResponse(error)
        ? (statusHandlers?.[error.status] ?? defaultStatusHandler)({
            error,
            params,
          })
        : unexpectedErrorHandler(error)}
    </div>
  );
}

export default GenericErrorBoundary;
