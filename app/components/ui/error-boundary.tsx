import { type JSX } from "react";
import {
  isRouteErrorResponse,
  Link,
  useParams,
  useRouteError,
  type ErrorResponse,
} from "react-router";
import { getErrorMessage, getStackTrace } from "~/utils/site";
import { CallToActionLeft } from "../cards/cta";
//@ts-ignore
import fatalErrorImage from "../../../public/images/error-500.png";
//@ts-ignore
import notFoundImage from "../../../public/images/error-404.png";

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
    <CallToActionLeft
      imageUrl={notFoundImage}
      imageAlt="image of a magnifying glass signifying a page not found"
      title={`Error-${error.status}`}
      text={error.data}
      actions={
        <Link
          className="font-header text-sm hover:underline text-secondary"
          to="/"
        >
          return home
        </Link>
      }
    ></CallToActionLeft>
    // <>
    //   <h1>{error.status}</h1>
    //   <p>{error.data}</p>
    // </>
  ),
  unexpectedErrorHandler = (error) => (
    <div className="flex flex-col bg-background w-full items-center border-b-0">
      <CallToActionLeft
        imageUrl={fatalErrorImage}
        imageAlt="server room in flames signifying a fatal server error"
        title="Error - 500"
        tagLine="something unexpected happened"
        text="The system administrator has been notified. Please use the link below to return to the home page."
        actions={
          <Link
            className="font-header text-sm hover:underline text-secondary"
            to="/"
          >
            return home
          </Link>
        }
      ></CallToActionLeft>
      <div className="mt-20">
        <pre className="w-[90%] whitespace-pre p-4 overflow-x-auto text-xs">
          <code>{getStackTrace(error)}</code>
        </pre>
      </div>
    </div>
  ),
}: Props) {
  const error = useRouteError();
  const params = useParams();

  if (error === undefined) {
    return "";
  }

  if (typeof document !== "undefined") {
    console.error(JSON.stringify(error));
  }

  return (
    <div className="mx-auto flex flex-col h-full w-full items-center justify-center bg-siteWhite p-20 text-h2">
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
