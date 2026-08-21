const NodePalette = ({ onAddNode }) => {
  return (
    <div className="w-56 rounded-xl border border-border bg-surface p-4">
      <h2 className="mb-4 font-semibold text-text">
        Add Node
      </h2>

      {/* Data Sources */}
      <div className="mb-4">
        <p className="mb-2 text-xs font-semibold uppercase text-muted">
          Data Sources
        </p>

        <button
          type="button"
          onClick={() => onAddNode("turbineSensor")}
          className="w-full rounded-lg border border-border px-3 py-2 text-left text-sm text-text hover:bg-surface"
        >
          + Turbine Sensor
        </button>
      </div>

      {/* Math Operations */}
      <div className="mb-4">
        <p className="mb-2 text-xs font-semibold uppercase text-muted">
          Math Operations
        </p>

        <button
          type="button"
          onClick={() => onAddNode("movingAverage")}
          className="w-full rounded-lg border border-border px-3 py-2 text-left text-sm text-text hover:bg-surface"
        >
          + Moving Average
        </button>
      </div>

      {/* Action Triggers */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase text-muted">
          Action Triggers
        </p>

        <button
          type="button"
          onClick={() => onAddNode("smsAlert")}
          className="w-full rounded-lg border border-border px-3 py-2 text-left text-sm text-text hover:bg-surface"
        >
          + SMS Alert
        </button>
      </div>
    </div>
  );
};

export default NodePalette;