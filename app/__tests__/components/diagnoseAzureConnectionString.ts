export function diagnoseConnectionString(): void {
  const connectionString = import.meta.env
    .VITE_AZURE_APPLICATION_INSIGHTS_CONNECTION_STRING;

  console.log("🔍 Connection String Diagnostic:");
  console.log("Full length:", connectionString?.length || "undefined");

  if (!connectionString) {
    console.error("❌ CRITICAL: No connection string found!");
    return;
  }

  // Check required components
  const requiredParts = [
    "InstrumentationKey=",
    "IngestionEndpoint=",
    "LiveEndpoint=",
  ];

  const results = requiredParts.map((part) => ({
    part,
    present: connectionString.includes(part),
    value:
      connectionString.split(part)[1]?.split(";")[0]?.substring(0, 20) + "...",
  }));

  results.forEach((result) => {
    console.log(
      `${result.present ? "✅" : "❌"} ${result.part}`,
      result.value || "MISSING"
    );
  });

  // Extract and validate instrumentation key
  const keyMatch = connectionString.match(/InstrumentationKey=([^;]+)/);
  if (keyMatch) {
    const key = keyMatch[1];
    const isValidGuid =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        key
      );
    console.log(`${isValidGuid ? "✅" : "❌"} InstrumentationKey format:`, key);
  }

  // Extract ingestion endpoint
  const endpointMatch = connectionString.match(/IngestionEndpoint=([^;]+)/);
  if (endpointMatch) {
    console.log("✅ IngestionEndpoint:", endpointMatch[1]);
  }
}
