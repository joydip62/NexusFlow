import { useMemo, useState } from "react";
import useTelemetry from "../../../hooks/useTelemetry";
import TelemetryTable from "../components/TelemetryTable";
import TelemetryFilters from "../components/TelemetryFilters";

const TelemetryPage = () => {
  const { telemetry, loading, error, refetch } = useTelemetry();

  const [deviceId, setDeviceId] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 2;

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
    setCurrentPage(1);
    setDeviceId("");
    setFromDate("");
    setToDate("");
  };

  const onDeviceIdChange = (value) => {
    setCurrentPage(1);
    setDeviceId(value);
  };

  const onFromDateChange = (value) => {
    setCurrentPage(1);
    setFromDate(value);
  };

  const onToDateChange = (value) => {
    setCurrentPage(1);
    setToDate(value);
  };

  // Pagination on telemetry table
  const totalPages = Math.ceil(filteredTelemetry.length / recordsPerPage);

  const paginatedTelemetry = useMemo(() => {
    const startIndex = (currentPage - 1) * recordsPerPage;

    const endIndex = startIndex + recordsPerPage;

    return filteredTelemetry.slice(startIndex, endIndex);
  }, [filteredTelemetry, currentPage]);

  return (
    <section>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text">Telemetry</h1>

          <p className="mt-2 text-muted">Monitor incoming sensor data.</p>
        </div>

        <button
          type="button"
          onClick={refetch}
          disabled={loading}
          className="rounded-lg border border-border px-4 py-2 text-sm text-text hover:bg-surface disabled:opacity-50"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {loading && <p className="mt-6 text-muted">Loading telemetry data...</p>}

      {error && <p className="mt-6 text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <p className="mt-6 text-muted">
            Total records: {filteredTelemetry.length}
          </p>

          <TelemetryFilters
            deviceId={deviceId}
            setDeviceId={onDeviceIdChange}
            devices={devices}
            fromDate={fromDate}
            setFromDate={onFromDateChange}
            toDate={toDate}
            setToDate={onToDateChange}
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

          <TelemetryTable telemetry={paginatedTelemetry} />
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((page) => page - 1)}
                className="rounded-lg border border-border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
                
              </button>

              <span className="px-3 text-sm text-muted">
                Page {currentPage} of {totalPages}
              </span>

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((page) => page + 1)}
                className="rounded-lg border border-border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default TelemetryPage;
