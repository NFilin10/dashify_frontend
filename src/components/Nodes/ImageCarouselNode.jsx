import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { X } from "lucide-react";
import ImageCarousel from "@/components/ui/Widgets/ImageCarousel/ImageCarousel.jsx";

const ImageCarouselNode = ({ data }) => {
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
            <ImageCarousel />
            <Handle type="source" position={Position.Bottom}/>
        </div>
    );
};

export default ImageCarouselNode;
