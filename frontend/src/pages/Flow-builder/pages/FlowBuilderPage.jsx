import { useState } from "react";

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
    <p className="text-sm text-muted">
      Selected Node
    </p>

    <p className="mt-1 font-semibold text-text">
      {selectedNode.data.label}
    </p>
  </div>
)}
        </div>
      </div>
    </section>
  );
};

export default FlowBuilderPage;