import { closestCorners, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Column from "./Column";
import { useState } from "react";
import { useDnD } from "@/contexts/DnDContext.jsx";
import Calculator from "@/components/ui/Calculator/Calculator.jsx";
import { Calendar } from "@/components/ui/calendar";


const DnDLayout = () => {
    const data = [
        {
            id: "Column1",
            title: "Column1",
            cards: [],
        },
        {
            id: "Column2",
            title: "Column2",
            cards: [],
        },
    ];

    const [columns, setColumns] = useState(data);
    const [widgetType, setWidgetType] = useDnD(); // Context to get the widget type

    const findColumn = (id) => {
        if (!id) return null;
        const column = columns.find((c) => c.id === id);
        if (column) return column;
        return columns.find((c) => c.cards.some((card) => card.id === id)) || null;
    };

    const handleDragOver = (event) => {
        const { active, over } = event;
        if (!over) return;

        const activeColumn = findColumn(active.id);
        const overColumn = findColumn(over.id);
        if (!activeColumn || !overColumn || activeColumn === overColumn) return;

        setColumns((prevColumns) => {
            const activeCards = activeColumn.cards.filter((c) => c.id !== active.id);
            const newOverCards = [...overColumn.cards, activeColumn.cards.find((c) => c.id === active.id)];

            return prevColumns.map((col) =>
                col.id === activeColumn.id ? { ...col, cards: activeCards } :
                    col.id === overColumn.id ? { ...col, cards: newOverCards } : col
            );
        });
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;

        const activeColumn = findColumn(active.id);
        const overColumn = findColumn(over.id);

        if (!activeColumn || !overColumn) return;

        setColumns((prevColumns) => {
            let activeWidget = activeColumn.cards.find((c) => c.id === active.id);
            if (!activeWidget) return prevColumns;

            let newColumns = prevColumns.map((col) => ({
                ...col,
                cards: col.id === activeColumn.id
                    ? col.cards.filter((c) => c.id !== active.id) // Remove from old column
                    : col.cards,
            }));

            return newColumns.map((col) =>
                col.id === overColumn.id
                    ? { ...col, cards: [...col.cards, activeWidget] } // Add to new column
                    : col
            );
        });
    };


    const widgetComponents = {
        calculator: Calculator,
        calendar: Calendar,
        // Add other widget components here
    };

    const handleDropWidget = (columnId) => {
        if (!widgetType) return;

        const newWidget = {
            id: `${widgetType}-${Date.now()}`,
            type: widgetType,
            Component: widgetComponents[widgetType] || null,  // Dynamically select the component based on type
        };

        setColumns((prevColumns) => {
            return prevColumns.map((col) => {
                if (col.id === columnId) {
                    return { ...col, cards: [...col.cards, newWidget] };
                }
                return col;
            });
        });

        setWidgetType(null); // Reset widget type after adding to column
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    return (
        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
            <div className="App" style={{ display: "flex", marginLeft: "500px" }}>
                {columns.map((column) => (
                    <Column
                        key={column.id}
                        id={column.id}
                        title={column.title}
                        cards={column.cards}
                        onDropWidget={handleDropWidget}
                    />
                ))}
            </div>
        </DndContext>
    );
};

export default DnDLayout;
