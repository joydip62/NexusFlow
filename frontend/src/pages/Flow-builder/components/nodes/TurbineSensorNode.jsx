import { Handle, Position } from "@xyflow/react";

const TurbineSensorNode = ({ data }) => {
    return (
        <div className="w-56 rounded-xl border border-border bg-surface shadow-md">

            {/* Header */}
            <div className="rounded-t-xl border-b border-border px-4 py-3">
                <h3 className="font-semibold text-text">
                    Turbine Sensor
                </h3>

                <p className="mt-1 text-xs text-muted">
                    Data Source
                </p>
            </div>

            {/* Content */}
            <div className="space-y-2 px-4 py-3">

                <div className="flex justify-between text-sm">
                    <span className="text-muted">
                        Device
                    </span>

                    <span className="font-medium text-text">
                        {data?.deviceId || "TUR-001"}
                    </span>
                </div>

                <div className="flex justify-between text-sm">
                    <span className="text-muted">
                        Type
                    </span>

                    <span className="font-medium text-text">
                        Turbine
                    </span>
                </div>

            </div>

            {/* Output Handle */}
            <Handle
                type="source"
                position={Position.Right}
            />

        </div>
    );
};

export default TurbineSensorNode;