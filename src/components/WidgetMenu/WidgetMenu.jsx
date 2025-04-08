import React from 'react';
import Styles from './WidgetMenu.module.css'; // Assuming you have a CSS module for styling
import { IoClose } from "react-icons/io5"; // Close icon for button
import { LuListTodo } from "react-icons/lu";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { CiLink } from "react-icons/ci";
import { FaImage } from "react-icons/fa";
import { FaRegNewspaper } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaCalculator } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { TbNewSection } from "react-icons/tb";
import { useDnD } from "@/contexts/DnDContext.jsx";

function WidgetMenu({ sidebarRef, closeSidebar }) {
    const style = { fontSize: "18px" };
    const [_, setType] = useDnD(); // Context to set the widget type

    const onDragStart = (event, nodeType) => {
        setType(nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const widgetElements = [
        // { name: "News", icon: <FaRegNewspaper style={style} />, type: "news" },
        { name: "Weather", icon: <TiWeatherPartlySunny style={style} />, type: "weather" },
        // { name: "Custom links", icon: <CiLink style={style} />, type: "customLinks" },
        { name: "Image carousel",  icon: <FaImage style={style} />, type: "imageCarousel" },
        // { name: "Todo list", icon: <LuListTodo style={style} />, type: "todoList" },
        // { name: "Html code", icon: <FaCode style={style} />, type: "htmlCode" },
        { name: "Calendar", icon: <FaRegCalendarAlt style={style} />, type: "calendar" },
        { name: "Clock", icon: <FaClock style={style} />, type: "clock" },
        { name: "Calculator", icon: <FaCalculator style={style} />, type: "calculator" },
        { name: "Search bar", icon: <IoSearch style={style} />, type: "searchBar" },
    ];

    return (
        <div
            ref={sidebarRef}
            className={`${Styles.sidebarContainer} bg-background text-foreground shadow-md transition-colors duration-300`}
        >
            <div className={Styles.closeButton} onClick={closeSidebar}>
                <IoClose size={24} />
            </div>
            <div className={Styles.widgetList}>
                {widgetElements.map((widget, index) => (
                    <div
                        key={index}
                        className={Styles.widgetItem}
                        onDragStart={(event) => onDragStart(event, widget.type)}
                        draggable
                    >
                        {widget.icon}
                        <span>{widget.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default WidgetMenu;
