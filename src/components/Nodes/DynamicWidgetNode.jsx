import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { X } from 'lucide-react';
import Calculator from '@/components/ui/Widgets/Calculator/Calculator.jsx';
import Clock from '@/components/ui/Widgets/Clock/Clock.jsx';
import { Calendar } from "@/components/ui/Widgets/calendar.jsx";
import ImageCarousel from "@/components/ui/Widgets/ImageCarousel/ImageCarousel.jsx";
import SearchBar from "@/components/ui/Widgets/SearchBar/SearchBar.jsx";
import Note from "@/components/ui/Widgets/Note/Note.jsx";
import CustomLinks from "@/components/ui/Widgets/customLinks/CustomLinks.jsx";
import News from "@/components/ui/Widgets/News/News.jsx";
import ToDo from "@/components/ui/Widgets/ToDo/ToDo.jsx";
import WeatherWidget from "@/components/ui/Widgets/Weather/WeatherWidget.jsx";
import Styles from './DynamicWidgetNode.module.css';

const widgetMap = {
    calculator: Calculator,
    clock: Clock,
    weather: WeatherWidget,
    calendar: Calendar,
    imageCarousel: ImageCarousel,
    searchBar: SearchBar,
    note: Note,
    customLinks: CustomLinks,
    news: News,
    todoList: ToDo
};

const DynamicWidgetNode = ({ data }) => {
    const Widget = widgetMap[data.type];

    const containerStyle = {
        backgroundColor: data.type === 'calendar' ? '#fff' : 'transparent',
        width: data.type === 'news' ? '800px' : '',
    };

    return (
        <div style={containerStyle}>
            <Handle type="target" position={Position.Top} />
            <div className={Styles.closeBtn}
                 onClick={() => data.onRemove?.(data.widget_id)}
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
