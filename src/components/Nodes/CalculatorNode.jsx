import React from 'react';
import { Handle, Position } from '@xyflow/react';
import Calculator from '@/components/ui/Calculator/Calculator.jsx';

const CalculatorNode = ({ data }) => {
    return (
        <div style={{ padding: 10, border: '1px solid #ddd', borderRadius: 5, background: '#fff' }}>
            <Handle type="target" position={Position.Top} />
            <Calculator/>
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
};

export default CalculatorNode;
