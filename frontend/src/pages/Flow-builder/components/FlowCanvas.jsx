import {
    addEdge,
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    useEdgesState,
    useNodesState,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import TurbineSensorNode from "./nodes/TurbineSensorNode";
import MovingAverageNode from "./nodes/MovingAverageNode";

const nodeTypes = {
    turbineSensor: TurbineSensorNode,
    movingAverage: MovingAverageNode,
};

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
];

const initialEdges = [];

const FlowCanvas = () => {

    const [nodes, setNodes, onNodesChange] =
        useNodesState(initialNodes);

    const [edges, setEdges, onEdgesChange] =
        useEdgesState(initialEdges);

    const onConnect = (connection) => {
        setEdges((currentEdges) =>
            addEdge(connection, currentEdges)
        );
    };

    return (
        <div className="h-[600px] w-full rounded-xl border border-border">

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