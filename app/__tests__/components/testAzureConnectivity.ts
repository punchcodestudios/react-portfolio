export async function testAzureConnectivity(): Promise<void> {
  const connectionString = import.meta.env
    .VITE_AZURE_APPLICATION_INSIGHTS_CONNECTION_STRING;

  if (!connectionString) {
    console.error("❌ Cannot test connectivity - no connection string");
    return;
  }

  const endpointMatch = connectionString.match(/IngestionEndpoint=([^;]+)/);
  if (!endpointMatch) {
    console.error("❌ Cannot extract endpoint from connection string");
    return;
  }

  const endpoint = endpointMatch[1];
  console.log("🌐 Testing connectivity to:", endpoint);

  try {
    // Test 1: Basic endpoint reachability
    const basicUrl = endpoint.replace("/v2/track", "");
    console.log("Testing basic endpoint:", basicUrl);

    const response = await fetch(basicUrl, {
      method: "HEAD",
      mode: "no-cors",
    });
    console.log("✅ Basic connectivity test completed");

    // Test 2: Full telemetry endpoint
    console.log("Testing telemetry endpoint:", endpoint);

    const telemetryResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Microsoft.ApplicationInsights.Event",
        time: new Date().toISOString(),
        iKey: connectionString.match(/InstrumentationKey=([^;]+)/)?.[1],
        data: {
          baseType: "EventData",
          baseData: {
            name: "ConnectivityTest",
            properties: {
              source: "diagnostic",
            },
          },
        },
      }),
    });

    console.log(
      "✅ Telemetry endpoint response:",
      response.status,
      response.statusText
    );
  } catch (error) {
    console.error("❌ Connectivity test failed:", error);

    // Additional browser-specific checks
    if (
      error instanceof TypeError &&
      error.message.includes("Failed to fetch")
    ) {
      console.error("🚫 Possible CORS or network blocking issue");
      console.error(
        "💡 Check if corporate firewall blocks *.applicationinsights.azure.com"
      );
    }
  }
}
