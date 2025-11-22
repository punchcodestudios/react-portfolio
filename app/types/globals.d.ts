declare global {
  function createMockCorrelationId(
    serviceName: string,
    operation: string
  ): string;

  var mockAzureInsights: {
    trackEvent: any;
    trackException: any;
    trackDependency: any;
    trackMetric: any;
  };

  var mockLoggerService: {
    debug: any;
    info: any;
    warn: any;
    error: any;
    success: any;
    performance: any;
    initialize: any;
    isInitialized: any;
    flush: any;
    trackFeatureUsage: any;
    trackComponentPerformance: any;
    trackGlobalError: any;
    measure: any;
  };
}

export {};
