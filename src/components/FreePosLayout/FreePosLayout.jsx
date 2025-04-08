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
import { useDnD } from '@/contexts/DnDContext.jsx';
import DynamicWidgetNode from "@/components/Nodes/DynamicWidgetNode.jsx";

const initialNodes = [

];

let id = 2;
const getId = () => `dndnode_${id++}`;

const nodeTypes = {
    widgetNode: DynamicWidgetNode,
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

    const handleRemoveNode = useCallback((nodeId) => {
        setNodes((nodes) => nodes.filter((node) => node.id !== nodeId));
    }, [setNodes]);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();
            if (!type) return;

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const newId = getId();
            const newNode = {
                id: newId,
                type: 'widgetNode',
                position,
                data: {
                    id: newId,
                    type: type,
                    onRemove: handleRemoveNode,
                },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition, type, handleRemoveNode, setNodes]
    );

    return (
        <div className="dndflow">
            <div
                className="reactflow-wrapper"
                ref={reactFlowWrapper}
            >
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                >
                    <Controls />
                    <Background />
                </ReactFlow>
            </div>
        </div>
    );
};

export default () => (
    <ReactFlowProvider>
        <DnDFlow />
    </ReactFlowProvider>
);
