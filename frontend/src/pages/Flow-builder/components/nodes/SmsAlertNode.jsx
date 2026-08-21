import { Handle, Position } from "@xyflow/react";

const SmsAlertNode = ({ data }) => {
    return (
        <div className="w-56 rounded-xl border border-border bg-surface shadow-md">

            {/* Header */}
            <div className="rounded-t-xl border-b border-border px-4 py-3">
                <h3 className="font-semibold text-text">
                    SMS Alert
                </h3>

                <p className="mt-1 text-xs text-muted">
                    Action Trigger
                </p>
            </div>

            {/* Content */}
            <div className="space-y-2 px-4 py-3">

                <div className="flex justify-between text-sm">
                    <span className="text-muted">
                        Phone
                    </span>

                    <span className="font-medium text-text">
                        {data?.phone || "+91 74784 55134"}
                    </span>
                </div>

                <div className="flex justify-between text-sm">
                    <span className="text-muted">
                        Status
                    </span>

                    <span className="font-medium text-text">
                        Ready
                    </span>
                </div>

            </div>

            {/* Input Handle */}
            <Handle
                type="target"
                position={Position.Left}
            />

        </div>
    );
};

export default SmsAlertNode;