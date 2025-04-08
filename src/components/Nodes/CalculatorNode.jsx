import React from 'react';
import { Handle, Position } from '@xyflow/react';
import Calculator from '@/components/ui/Widgets/Calculator/Calculator.jsx';
import { X } from "lucide-react";

const CalculatorNode = ({ data }) => {
    return (
        <div>
            <Handle type="target" position={Position.Top}/>
            <div
                style={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    cursor: 'pointer',
                    padding: '2px',
                    zIndex: 10,
                }}
                onClick={() => data.onRemove?.(data.id)}
                title="Remove node"
            >
                <X size={16} color="#f44336"/>
            </div>
            <Calculator/>
            <Handle type="source" position={Position.Bottom}/>
        </div>
    );
};

export default CalculatorNode;
