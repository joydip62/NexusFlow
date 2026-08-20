import { useMemo, useState } from "react";
import useTelemetry from "../../../hooks/useTelemetry";
import TelemetryTable from "../components/TelemetryTable";
import TelemetryFilters from "../components/TelemetryFilters";

const TelemetryPage = () => {
  const { telemetry, loading, error } = useTelemetry();

  const [deviceId, setDeviceId] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Get unique device ID
  const devices = useMemo(() => {
    return [
      ...new Set(telemetry.map((item) => item.metadata?.deviceId)),
    ].filter(Boolean);
  }, [telemetry]);

  // Filter telemetry by selected device
  const filteredTelemetry = useMemo(() => {
    return telemetry.filter((item) => {
      const itemDate = new Date(item.timestamp);

      // Device filter
      if (deviceId && item.metadata?.deviceId !== deviceId) {
        return false;
      }

      // From date filter
      if (fromDate) {
        const startDate = new Date(fromDate);
        startDate.setHours(0, 0, 0, 0);

        if (itemDate < startDate) {
          return false;
        }
      }

      // To date filter
      if (toDate) {
        const endDate = new Date(toDate);
        endDate.setHours(23, 59, 59, 999);

        if (itemDate > endDate) {
          return false;
        }
      }

      return true;
    });
  }, [telemetry, deviceId, fromDate, toDate]);

  const onClearFilters = () => {
    setDeviceId("");
    setFromDate("");
    setToDate("");
  };
  return (
    <section>
      <h1 className="text-3xl font-bold text-text">Telemetry</h1>

      <p className="mt-2 text-muted">Monitor incoming sensor data.</p>

      {loading && <p className="mt-6 text-muted">Loading telemetry data...</p>}

      {error && <p className="mt-6 text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <p className="mt-6 text-muted">
            Total records: {filteredTelemetry.length}
          </p>

          <TelemetryFilters
            deviceId={deviceId}
            setDeviceId={setDeviceId}
            devices={devices}
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
            onClearFilters={onClearFilters}
          />
          {(deviceId || fromDate || toDate) && (
            <button
              type="button"
              onClick={onClearFilters}
              className="rounded-lg border border-border px-4 py-2 text-sm text-text hover:bg-surface"
            >
              Clear Filters
            </button>
          )}

          <TelemetryTable telemetry={filteredTelemetry} />
        </>
      )}
    </section>
  );
};

export default TelemetryPage;
