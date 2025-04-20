import { useState, useCallback, useEffect } from 'react';
import { fetchWidgetPositions, addWidget, addWidgetPosition, updateWidgetPosition, deleteWidget } from '@/http/freePosService.js';
import {useReactFlow} from "@xyflow/react";

export function useFreePos() {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [type, setType] = useState(null);
    const { screenToFlowPosition } = useReactFlow();

    const handleAddWidget = useCallback(async (widgetType, event) => {
        const position = screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
        });

        try {
            const { widgetId } = await addWidget(widgetType);
            const newNode = {
                id: String(widgetId),
                type: 'widgetNode',
                position,
                data: {
                    widget_id: String(widgetId),
                    type: widgetType,
                    onRemove: handleRemoveNode,
                },
            };

            setNodes((nds) => nds.concat(newNode));

            await addWidgetPosition(widgetId, position);
        } catch (error) {
            console.error("Error adding widget:", error);
        }
    }, [screenToFlowPosition]);

    const handleRemoveNode = useCallback(async (nodeId) => {
        try {
            await deleteWidget(nodeId);
            setNodes((nodes) => nodes.filter((node) => node.id !== nodeId));
        } catch (error) {
            console.error("Error deleting widget:", error);
        }
    }, []);

    const handleUpdateWidgetPosition = useCallback((changes) => {
        setNodes((nds) => {
            const updatedNodes = nds.map((node) => {
                const change = changes.find((c) => c.id === node.id);
                if (change?.type === 'position' && change.position) {
                    updateWidgetPosition(node.id, change.position).catch(err => console.error("Failed to update widget position", err));
                    return { ...node, position: change.position };
                }
                return node;
            });
            return updatedNodes;
        });
    }, []);

    useEffect(() => {
        async function fetchWidgets() {
            try {
                const positions = await fetchWidgetPositions();
                const restoredNodes = positions.map(pos => ({
                    id: String(pos.widget_id),
                    type: 'widgetNode',
                    position: { x: pos.x, y: pos.y },
                    data: {
                        widget_id: String(pos.widget_id),
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
    }, [handleRemoveNode]);

    return {
        nodes,
        edges,
        setNodes,
        setEdges,
        type,
        setType,
        handleAddWidget,
        handleUpdateWidgetPosition,
        handleRemoveNode,
    };
}
