const RATE_LIMIT_KEY = "form_submissions";
const MAX_SUBMISSIONS = 3;
const TIME_WINDOW = 60 * 60 * 1000; // 1 hour

interface SubmissionRecord {
  timestamp: number;
  count: number;
}

export function useRateLimit() {
  const checkRateLimit = (): {
    allowed: boolean;
    remaining: number;
    resetTime: number;
  } => {
    const record = JSON.parse(
      localStorage.getItem(RATE_LIMIT_KEY) || '{"timestamp": 0, "count": 0}'
    ) as SubmissionRecord;

    const now = Date.now();

    // Reset if time window has passed
    if (now - record.timestamp > TIME_WINDOW) {
      localStorage.setItem(
        RATE_LIMIT_KEY,
        JSON.stringify({ timestamp: now, count: 1 })
      );
      return {
        allowed: true,
        remaining: MAX_SUBMISSIONS - 1,
        resetTime: now + TIME_WINDOW,
      };
    }

    // Check if limit exceeded
    if (record.count >= MAX_SUBMISSIONS) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: record.timestamp + TIME_WINDOW,
      };
    }

    // Increment count
    localStorage.setItem(
      RATE_LIMIT_KEY,
      JSON.stringify({
        timestamp: record.timestamp,
        count: record.count + 1,
      })
    );

    return {
      allowed: true,
      remaining: MAX_SUBMISSIONS - record.count - 1,
      resetTime: record.timestamp + TIME_WINDOW,
    };
  };

  const getRemainingSubmissions = (): number => {
    const record = JSON.parse(
      localStorage.getItem(RATE_LIMIT_KEY) || '{"timestamp": 0, "count": 0}'
    ) as SubmissionRecord;

    const now = Date.now();

    if (now - record.timestamp > TIME_WINDOW) {
      return MAX_SUBMISSIONS;
    }

    return Math.max(0, MAX_SUBMISSIONS - record.count);
  };

  return { checkRateLimit, getRemainingSubmissions };
}
