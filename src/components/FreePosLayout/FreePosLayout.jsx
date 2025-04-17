import React, { useRef, useCallback, useEffect, useState } from 'react';
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
            const response = await fetch('http://localhost:8080/pos/delete-widget', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ widget_id: nodeId }),
            });

            if (!response.ok) {
                console.error("Failed to delete widget:", response.statusText);
                return;
            }

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
                const response = await fetch('http://localhost:8080/pos/add-widget', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ widget_type: type }),
                });

                if (!response.ok) throw new Error("Failed to create widget");

                const { widgetId } = await response.json();

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

                await fetch('http://localhost:8080/pos/add-widget-position', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({
                        x: position.x,
                        y: position.y,
                        widget_id: widgetId,
                    }),
                });
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

                    fetch('http://localhost:8080/pos/update-widget-position', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                        body: JSON.stringify({
                            widget_id: node.id,
                            x: change.position.x,
                            y: change.position.y,
                        }),
                    }).catch(err => console.error("Failed to update widget position", err));

                    return { ...node, position: change.position };
                }
                return node;
            });
            return updatedNodes;
        });

        onNodesChangeBase(changes);
    }, [setNodes, onNodesChangeBase]);

    useEffect(() => {
        async function fetchWidgets() {
            try {
                const response = await fetch('http://localhost:8080/pos/get-widget-positions', {
                    credentials: 'include',
                });
                const positions = await response.json();

                const restoredNodes = positions.map(pos => ({
                    id: String(pos.widget_id),
                    type: 'widgetNode',
                    position: { x: pos.x, y: pos.y },
                    data: {
                        id: String(pos.widget_id),
                        type: pos.widget_type,
                        onRemove: handleRemoveNode,
                    },
                }));

                setNodes(restoredNodes);
            } catch (err) {
                console.error("Failed to load widget positions:", err);
            }
        }

        fetchWidgets();
    }, [handleRemoveNode, setNodes]);

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
