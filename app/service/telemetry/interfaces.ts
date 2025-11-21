import { SeverityLevel } from "@microsoft/applicationinsights-web";

export interface ITelemetryEvent {
  name: string;
  properties?: Record<string, string>;
  measurements?: Record<string, number>;
}

export interface ITelemetryMetric {
  name: string;
  value: number;
  properties?: Record<string, string>;
}

export interface ITelemetryException {
  error: Error;
  properties?: Record<string, string>;
  severityLevel?: SeverityLevel;
}

export interface ITelemetryDependency {
  name: string;
  duration: number;
  success: boolean;
  responseCode: number;
  type?: string;
  data?: string;
  properties?: Record<string, string>;
}
