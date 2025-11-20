import React from "react";
import TelemetryStatus from "~/__tests__/components/TelemetryStatus";

const TelemetryStatusPage: React.FC<{ enabled: boolean }> = ({ enabled }) => {
  return (
    <div className="telemetry-status p-4 bg-gray-100 rounded-lg">
      <h4 className="font-bold">Health Checks</h4>
      <TelemetryStatus></TelemetryStatus>
    </div>
  );
};
export default TelemetryStatusPage;
