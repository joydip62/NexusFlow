import {
  addEdge,
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useEdgesState,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import TurbineSensorNode from "./nodes/TurbineSensorNode";
import MovingAverageNode from "./nodes/MovingAverageNode";
import SmsAlertNode from "./nodes/SmsAlertNode";

const nodeTypes = {
  turbineSensor: TurbineSensorNode,
  movingAverage: MovingAverageNode,
  smsAlert: SmsAlertNode,
};

const initialEdges = [
  {
    id: "turbine-to-average",
    source: "turbine-1",
    target: "moving-average-1",
  },
  {
    id: "average-to-sms",
    source: "moving-average-1",
    target: "sms-alert-1",
  },
];

const FlowCanvas = ({ nodes, setNodes }) => {
  const [edges, setEdges, onEdgesChange] =
    useEdgesState(initialEdges);

  const onConnect = (connection) => {
    setEdges((currentEdges) =>
      addEdge(connection, currentEdges)
    );
  };

  const onNodesChange = (changes) => {
    setNodes((currentNodes) => {
      let updatedNodes = [...currentNodes];

      changes.forEach((change) => {
        if (change.type === "position" && change.position) {
          updatedNodes = updatedNodes.map((node) =>
            node.id === change.id
              ? {
                  ...node,
                  position: change.position,
                }
              : node
          );
        }
      });

      return updatedNodes;
    });
  };

  return (
    <div className="h-150 w-full rounded-xl border border-border">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default FlowCanvas;