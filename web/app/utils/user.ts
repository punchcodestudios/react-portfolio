import { useRouteLoaderData } from "react-router";
import { type loader as rootLoader } from "app/root";

export function useOptionalUser() {
  const data = useRouteLoaderData<typeof rootLoader>("root");
  return data?.user ?? null;
}

export function useUser() {
  const user = useOptionalUser();
  if (!user) {
    throw new Error(
      "No user found in root loader, but is required. If user is optional, use useOptionalUser() instead."
    );
  }
  return user;
}
