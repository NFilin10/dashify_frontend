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
import { deleteWidget, addWidget, addWidgetPosition, updateWidgetPosition } from '@/http/freePosService.js';
import useWidgets from '@/hooks/useFreePos.js';

const initialNodes = [];
let id = 2;
const getId = () => `dndnode_${id++}`;

const nodeTypes = {
    widgetNode: DynamicWidgetNode,
};

const DnDFlow = () => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChangeBase] = useNodesState(initialNodes);
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

    const handleRemoveNode = useCallback(async (nodeId) => {
        try {
            await deleteWidget(nodeId);
            setNodes((nodes) => nodes.filter((node) => node.id !== nodeId));
        } catch (error) {
            console.error("Error deleting widget:", error);
        }
    }, [setNodes]);

    const onDrop = useCallback(
        async (event) => {
            event.preventDefault();
            if (!type) return;

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            try {
                const response = await addWidget(type);
                const { widgetId } = response.data;

                const newNode = {
                    id: String(widgetId),
                    type: 'widgetNode',
                    position,
                    data: {
                        id: String(widgetId),
                        type: type,
                        onRemove: handleRemoveNode,
                    },
                };

                setNodes((nds) => nds.concat(newNode));
                await addWidgetPosition(widgetId, position);
            } catch (error) {
                console.error("Error adding widget:", error);
                alert("Could not add widget. Try again.");
            }
        },
        [screenToFlowPosition, type, handleRemoveNode, setNodes]
    );

    const onNodesChange = useCallback((changes) => {
        setNodes((nds) => {
            const updatedNodes = nds.map((node) => {
                const change = changes.find((c) => c.id === node.id);
                if (change?.type === 'position' && change.position) {
                    updateWidgetPosition(node.id, change.position).catch((err) =>
                        console.error("Failed to update widget position", err)
                    );

                    return { ...node, position: change.position };
                }
                return node;
            });
            return updatedNodes;
        });

        onNodesChangeBase(changes);
    }, [setNodes, onNodesChangeBase]);

    useWidgets(handleRemoveNode, setNodes);

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
