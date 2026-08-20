const TelemetryTable = ({ telemetry }) => {
  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-left text-sm">
        <thead className="bg-surface">
          <tr>
            <th className="px-4 py-3 font-medium text-muted">Device ID</th>

            <th className="px-4 py-3 font-medium text-muted">Type</th>

            <th className="px-4 py-3 font-medium text-muted">Temperature</th>

            <th className="px-4 py-3 font-medium text-muted">Pressure</th>

            <th className="px-4 py-3 font-medium text-muted">RPM</th>

            <th className="px-4 py-3 font-medium text-muted">Timestamp</th>
          </tr>
        </thead>

        <tbody>
          {telemetry.length === 0 ? (
            <tr>
              <td colSpan="6" className="px-4 py-8 text-center text-muted">
                No telemetry data found.
              </td>
            </tr>
          ) : (
            telemetry.map((item) => (
              <tr
                key={item._id}
                className="border-t border-border hover:bg-surface/50"
              >
                <td className="px-4 py-3 font-medium text-text">
                  {item.metadata?.deviceId || "-"}
                </td>

                <td className="px-4 py-3 text-muted">
                  {item.metadata?.deviceType || "-"}
                </td>

                <td className="px-4 py-3 text-text">
                  {item.temperature ?? "-"}
                </td>

                <td className="px-4 py-3 text-text">{item.pressure ?? "-"}</td>

                <td className="px-4 py-3 text-text">{item.rpm ?? "-"}</td>

                <td className="px-4 py-3 text-muted">
                  {new Date(item.timestamp).toLocaleString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TelemetryTable;
