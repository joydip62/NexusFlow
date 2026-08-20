import { Handle, Position } from "@xyflow/react";

const MovingAverageNode = ({ data }) => {
    return (
        <div className="w-56 rounded-xl border border-border bg-surface shadow-md">

            {/* Header */}
            <div className="rounded-t-xl border-b border-border px-4 py-3">
                <h3 className="font-semibold text-text">
                    Moving Average
                </h3>

                <p className="mt-1 text-xs text-muted">
                    Math Operation
                </p>
            </div>

            {/* Content */}
            <div className="space-y-2 px-4 py-3">

                <div className="flex justify-between text-sm">
                    <span className="text-muted">
                        Window
                    </span>

                    <span className="font-medium text-text">
                        {data?.window || 5}
                    </span>
                </div>

                <div className="flex justify-between text-sm">
                    <span className="text-muted">
                        Field
                    </span>

                    <span className="font-medium text-text">
                        {data?.field || "temperature"}
                    </span>
                </div>

            </div>

            {/* Input Handle */}
            <Handle
                type="target"
                position={Position.Left}
            />

            {/* Output Handle */}
            <Handle
                type="source"
                position={Position.Right}
            />

        </div>
    );
};

export default MovingAverageNode;