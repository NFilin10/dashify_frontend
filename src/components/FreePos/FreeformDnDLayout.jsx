import { useState } from "react";
import { useDnD } from "@/contexts/DnDContext.jsx";
import { DndContext, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import FreeformContainer from "@/components/FreePos/FreeformContainer.jsx";
import WidgetMenu from "@/components/WidgetMenu/WidgetMenu.jsx";
import { closestCorners } from "@dnd-kit/core";
import Calculator from "@/components/ui/Calculator/Calculator.jsx";
import { Calendar } from "@/components/ui/calendar";

const FreeformDnDLayout = () => {
    const [widgetType, setWidgetType] = useDnD();
    const [widgets, setWidgets] = useState([]);

    const widgetComponents = {
        calculator: Calculator,
        calendar: Calendar,
    };

    const handleDropWidget = (position) => {
        if (!widgetType) return;

        const newWidget = {
            id: `${widgetType}-${Date.now()}`,
            type: widgetType,
            position,
            Component: widgetComponents[widgetType] || null,
        };

        setWidgets((prevWidgets) => [...prevWidgets, newWidget]);
        setWidgetType(null);
    };

    const updateWidgetPosition = (id, newPosition) => {
        setWidgets((prevWidgets) =>
            prevWidgets.map((widget) =>
                widget.id === id ? { ...widget, position: newPosition } : widget
            )
        );
    };

    const sensors = useSensors(useSensor(PointerSensor));

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={(event) => {
                const { active, delta } = event;
                setWidgets((prevWidgets) =>
                    prevWidgets.map((widget) =>
                        widget.id === active.id
                            ? { ...widget, position: { x: widget.position.x + delta.x, y: widget.position.y + delta.y } }
                            : widget
                    )
                );
            }}
        >
            <div className="App" style={{ position: "relative", height: "100vh", width: "100%" }}>
                {/*<WidgetMenu setWidgetType={setWidgetType} />*/}
                <FreeformContainer widgets={widgets} onDropWidget={handleDropWidget} updateWidgetPosition={updateWidgetPosition} />
            </div>
        </DndContext>
    );
};

export default FreeformDnDLayout;
