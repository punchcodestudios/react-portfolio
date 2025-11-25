import { useEffect, useState } from "react";

const CSRF_TOKEN_KEY = "csrf_token";
const CSRF_TOKEN_HEADER = "X-CSRF-Token";

export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
}

export function useCSRFToken() {
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    // Get existing token or generate new one
    let csrfToken = sessionStorage.getItem(CSRF_TOKEN_KEY);

    if (!csrfToken) {
      csrfToken = generateCSRFToken();
      sessionStorage.setItem(CSRF_TOKEN_KEY, csrfToken);
    }

    setToken(csrfToken);
  }, []);

  return token;
}

export function validateCSRFToken(submittedToken: string): boolean {
  const storedToken = sessionStorage.getItem(CSRF_TOKEN_KEY);
  return storedToken === submittedToken && submittedToken.length === 64;
}

export function getCSRFHeaders(): HeadersInit {
  const token = sessionStorage.getItem(CSRF_TOKEN_KEY);
  return {
    [CSRF_TOKEN_HEADER]: token || "",
  };
}
