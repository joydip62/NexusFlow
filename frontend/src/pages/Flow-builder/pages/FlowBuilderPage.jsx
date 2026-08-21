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
      deviceId: "TUR-001",
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
      window: 5,
      field: "temperature",
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
      phone: "+91 XXXXX XXXXX",
    },
  },
];

const FlowBuilderPage = () => {
  const [nodes, setNodes] = useState(initialNodes);

  const addNode = (type) => {
    const newNode = {
      id: `${type}-${Date.now()}`,
      type,
      position: {
        x: 150,
        y: 300,
      },
      data: {},
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
          />
        </div>
      </div>
    </section>
  );
};

export default FlowBuilderPage;