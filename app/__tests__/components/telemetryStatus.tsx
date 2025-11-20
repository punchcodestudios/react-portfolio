import { getTelemetryConfig } from "~/config/telemetry";

export default function TelemetryStatus() {
  const config = getTelemetryConfig();

  return (
    <div
      style={{
        // position: "fixed",
        // top: "10px",
        // right: "10px",
        background: "#f0f0f0",
        padding: "10px",
        border: "1px solid #ccc",
        fontSize: "12px",
        zIndex: 9999,
        maxWidth: "300px",
      }}
    >
      <h4>🔍 Telemetry Status</h4>
      <div>
        Environment: <strong>{config.environment}</strong>
      </div>
      <div>
        Version: <strong>{config.version}</strong>
      </div>
      <div>Enabled: {config.enabled ? "✅ Yes" : "❌ No"}</div>
      <div>
        Connection String: {config.connectionString ? "✅ Set" : "❌ Missing"}
      </div>
      <div>Debug Mode: {config.enableDebug ? "✅ On" : "❌ Off"}</div>
      <div>
        Logging Level: <strong>{config.loggingLevel}</strong>
      </div>
      <div>
        Sampling: <strong>{config.samplingPercentage}%</strong>
      </div>
      <div style={{ marginTop: "10px", fontSize: "10px", color: "#666" }}>
        Available ENV vars:
        <div>VITE_NODE_ENV: {import.meta.env.VITE_NODE_ENV || "undefined"}</div>
        <div>MODE: {import.meta.env.MODE}</div>
        <div>
          VITE_ENABLE_TELEMETRY:{" "}
          {import.meta.env.VITE_ENABLE_TELEMETRY || "undefined"}
        </div>
      </div>
    </div>
  );
}
