import { useEffect, useState } from "react";

import FlowCanvas from "../components/FlowCanvas";
import NodePalette from "../components/NodePalette";

const initialNodes = [
  {
    id: "turbine-1",
    type: "turbineSensor",
    position: {
      x: 100,
      y: 150,
    },
    data: {
      label: "Turbine Sensor",
      category: "data-source",
      config: {
        deviceId: "TUR-001",
      },
    },
  },

  {
    id: "moving-average-1",
    type: "movingAverage",
    position: {
      x: 450,
      y: 150,
    },
    data: {
      label: "Moving Average",
      category: "math-operation",
      config: {
        window: 5,
        field: "temperature",
      },
    },
  },

  {
    id: "sms-alert-1",
    type: "smsAlert",
    position: {
      x: 800,
      y: 150,
    },
    data: {
      label: "SMS Alert",
      category: "action-trigger",
      config: {
        phone: "+91 XXXXX XXXXX",
      },
    },
  },
];

const FlowBuilderPage = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [selectedNode, setSelectedNode] = useState(null);
  const [config, setConfig] = useState({});

  const addNode = (type) => {
    const defaultConfig = {
      turbineSensor: {
        deviceId: "TUR-001",
      },

      movingAverage: {
        window: 5,
        field: "temperature",
      },

      smsAlert: {
        phone: "+91 XXXXX XXXXX",
      },
    };

    const nodeLabels = {
      turbineSensor: "Turbine Sensor",
      movingAverage: "Moving Average",
      smsAlert: "SMS Alert",
    };

    const nodeCategories = {
      turbineSensor: "data-source",
      movingAverage: "math-operation",
      smsAlert: "action-trigger",
    };

    const newNode = {
      id: `${type}-${Date.now()}`,
      type,
      position: {
        x: 150,
        y: 300,
      },
      data: {
        label: nodeLabels[type],
        category: nodeCategories[type],
        config: defaultConfig[type],
      },
    };

    setNodes((currentNodes) => [
      ...currentNodes,
      newNode,
    ]);
  };

  const updateNodeConfig = (nodeId, newConfig) => {
    setNodes((currentNodes) =>
      currentNodes.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              data: {
                ...node.data,
                config: newConfig,
              },
            }
          : node
      )
    );

    setSelectedNode((currentNode) =>
      currentNode
        ? {
            ...currentNode,
            data: {
              ...currentNode.data,
              config: newConfig,
            },
          }
        : null
    );
  };

  useEffect(() => {
    if (selectedNode) {
      setConfig(selectedNode.data.config);
    }
  }, [selectedNode]);

  return (
    <section>
      <h1 className="text-3xl font-bold text-text">
        Flow Builder
      </h1>

      <p className="mt-2 text-muted">
        Build and connect your telemetry processing flow.
      </p>

      <div className="mt-6 flex gap-4">
        <NodePalette onAddNode={addNode} />

        <div className="flex-1">
          <FlowCanvas
            nodes={nodes}
            setNodes={setNodes}
            setSelectedNode={setSelectedNode}
          />

          {selectedNode && (
            <div className="mt-4 rounded-xl border border-border bg-surface p-4">
              <h2 className="text-lg font-semibold text-text">
                Node Configuration
              </h2>

              <p className="mt-1 text-sm text-muted">
                {selectedNode.data.label}
              </p>

              <div className="mt-4">
                {selectedNode.type === "turbineSensor" && (
                  <div>
                    <label className="text-sm text-muted">
                      Device ID
                    </label>

                    <input
                      type="text"
                      value={config.deviceId || ""}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          deviceId: e.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-text outline-none"
                    />
                  </div>
                )}

                {selectedNode.type === "movingAverage" && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-muted">
                        Window
                      </label>

                      <input
                        type="number"
                        value={config.window || ""}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            window: Number(e.target.value),
                          })
                        }
                        className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-text outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-muted">
                        Field
                      </label>

                      <input
                        type="text"
                        value={config.field || ""}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            field: e.target.value,
                          })
                        }
                        className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-text outline-none"
                      />
                    </div>
                  </div>
                )}

                {selectedNode.type === "smsAlert" && (
                  <div>
                    <label className="text-sm text-muted">
                      Phone
                    </label>

                    <input
                      type="text"
                      value={config.phone || ""}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          phone: e.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-text outline-none"
                    />
                  </div>
                )}

                <button
                  type="button"
                  onClick={() =>
                    updateNodeConfig(selectedNode.id, config)
                  }
                  className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FlowBuilderPage;