const TelemetryFilters = ({
  deviceId,
  setDeviceId,
  devices,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
}) => {
  return (
    <div className="mt-6 flex flex-wrap items-end gap-4">
      {/* Device */}
      <div>
        <label className="mb-1 block text-sm font-medium text-text">
          Device
        </label>

        <select
          value={deviceId}
          onChange={(event) => setDeviceId(event.target.value)}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-text"
        >
          <option value="">All Devices</option>

          {devices.map((device) => (
            <option key={device} value={device}>
              {device}
            </option>
          ))}
        </select>
      </div>

      {/* From Date */}
      <div>
        <label className="mb-1 block text-sm font-medium text-text">
          From Date
        </label>

        <input
          type="date"
          value={fromDate}
          onChange={(event) => setFromDate(event.target.value)}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-text"
        />
      </div>

      {/* To Date */}
      <div>
        <label className="mb-1 block text-sm font-medium text-text">
          To Date
        </label>

        <input
          type="date"
          value={toDate}
          onChange={(event) => setToDate(event.target.value)}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-text"
        />
      </div>
    </div>
  );
};

export default TelemetryFilters;
