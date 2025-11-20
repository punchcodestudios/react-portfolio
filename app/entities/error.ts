export type GlobalError = {
  id: string;
  message: string;
  stack: string | "";
  details: string;
  timestamp: string | "";
  url: string | "";
  userAgent: string | "";
  retryCount: number;
};

export type GlobalErrorDetails = {
  component?: string;
  route?: string;
  section?: string;
  errorInfo?: any;
  originalError?: any;
  [key: string]: any;
};
