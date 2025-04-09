import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { X } from 'lucide-react';

import Calculator from '@/components/ui/Widgets/Calculator/Calculator.jsx';
import Clock from '@/components/ui/Widgets/Clock/Clock.jsx';
import Weather from '@/components/ui/Widgets/Weather/Weather.jsx';
import { Calendar } from "@/components/ui/Widgets/calendar.jsx";
import ImageCarousel from "@/components/ui/Widgets/ImageCarousel/ImageCarousel.jsx";
import SearchBar from "@/components/ui/Widgets/SearchBar/SearchBar.jsx";
import Note from "@/components/ui/Widgets/Note/Note.jsx";
import CustomLinks from "@/components/ui/Widgets/customLinks/CustomLinks.jsx";

const widgetMap = {
    calculator: Calculator,
    clock: Clock,
    weather: Weather,
    calendar: Calendar,
    imageCarousel: ImageCarousel,
    searchBar: SearchBar,
    note: Note,
    customLinks: CustomLinks,
};

const DynamicWidgetNode = ({ data }) => {
    const Widget = widgetMap[data.type];

    const containerStyle = {
        backgroundColor: data.type === 'calendar' ? '#fff' : 'transparent',
        padding: '4px',
        borderRadius: '8px',
        position: 'relative',
    };

    return (
        <div style={containerStyle}>
            <Handle type="target" position={Position.Top} />
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
                <X size={16} color="#f44336" />
            </div>
            <Widget {...data} />
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
};

export default DynamicWidgetNode;
