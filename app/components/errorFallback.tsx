// components/errorFallback.tsx
import React from "react";
import { suspenseCache } from "~/utils/suspense-fetcher";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
  cacheKey?: string;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
  cacheKey,
}) => {
  const handleRetry = () => {
    resetErrorBoundary();
    if (cacheKey) {
      suspenseCache.clear(cacheKey);
    } else {
      suspenseCache.clear();
    }
    resetErrorBoundary();
  };

  // TODO: Add to future sprint: UI use punchcodestudio styled components for buttons and layout
  return (
    <div className="text-red-500 p-6 border border-red-300 rounded-lg bg-red-50">
      <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
      <p className="mb-4">{error.message}</p>
      <div className="flex gap-2">
        <button
          onClick={handleRetry}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Clear Cache & Retry
        </button>
        <button
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
        >
          Retry Without Clear
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;
