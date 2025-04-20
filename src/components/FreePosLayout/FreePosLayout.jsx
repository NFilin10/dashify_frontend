import React, { useRef, useCallback } from 'react';
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
import { useFreePos } from '@/hooks/useFreePos.js'; // Use custom hook

const initialNodes = [];
let id = 2;
const getId = () => `dndnode_${id++}`;

const nodeTypes = {
    widgetNode: DynamicWidgetNode,
};

const DnDFlow = () => {
    const reactFlowWrapper = useRef(null);
    const { nodes, edges, setEdges, handleAddWidget, handleUpdateWidgetPosition } = useFreePos();
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
            if (!type) return;

            handleAddWidget(type, event);
        },
        [type, handleAddWidget]
    );

    const onNodesChange = useCallback((changes) => {
        handleUpdateWidgetPosition(changes);
    }, [handleUpdateWidgetPosition]);

    return (
        <div className="dndflow">
            <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    onNodesChange={onNodesChange}
                    onEdgesChange={setEdges}
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
