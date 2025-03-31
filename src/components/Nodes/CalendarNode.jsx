import React from 'react';
import { Handle, Position } from '@xyflow/react';
import {Calendar} from "@/components/ui/calendar.jsx";

const CalculatorNode = ({ data }) => {
    return (
        <div style={{ padding: 10, border: '1px solid #ddd', borderRadius: 5, background: '#fff' }}>
            <Handle type="target" position={Position.Top} />
            <Calendar/>
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
};

export default CalculatorNode;
