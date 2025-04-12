import {
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router";
import { sessionStorage } from "~/utils/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieSession = await sessionStorage.getSession(
    request.headers.get("cookie")
  );
  return redirect("/", {
    headers: {
      "set-cookie": await sessionStorage.destroySession(cookieSession),
    },
  });
}

// export async function action({ request }: ActionFunctionArgs) {
//   const cookieSession = await sessionStorage.getSession(
//     request.headers.get("cookie")
//   );
//   return redirect("/", {
//     headers: {
//       "set-cookie": await sessionStorage.destroySession(cookieSession),
//     },
//   });
// }
