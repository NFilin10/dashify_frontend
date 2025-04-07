import React, { useRef, useCallback, useState } from 'react';
import {
    ReactFlow,
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    useReactFlow,
    Background,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { DnDProvider, useDnD } from '@/contexts/DnDContext.jsx';
import CalculatorNode from "@/components/Nodes/CalculatorNode.jsx";
import CalendarNode from "@/components/Nodes/CalendarNode.jsx";
import Navbar from "@/components/common/Navbar/Navbar.jsx";
import WidgetMenu from "@/components/WidgetMenu/WidgetMenu.jsx";

const initialNodes = [
    {
        id: '1',
        type: 'input',
        data: { label: 'input node' },
        position: { x: 250, y: 5 },
    },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const nodeTypes = {
    calculator: CalculatorNode,
    calendar: CalendarNode,
};

const DnDFlow = () => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const { screenToFlowPosition } = useReactFlow();
    const [type] = useDnD();

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        []
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            if (!type) {
                return;
            }

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const newNode = {
                id: getId(),
                type,
                position,
                data: { label: `${type} node` },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition, type]
    );

    return (
        <div className="dndflow">
            <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    // style={{ backgroundColor: "#F7F9FB" }}
                >
                    <Controls />
                    <Background />
                </ReactFlow>
            </div>
            {/*<WidgetMenu/>*/}
        </div>
    );
};

export default () => (
    <ReactFlowProvider>
        {/*<DnDProvider>*/}
            <DnDFlow />
        {/*</DnDProvider>*/}
    </ReactFlowProvider>
);