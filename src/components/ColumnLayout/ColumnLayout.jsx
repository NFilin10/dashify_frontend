import { closestCorners, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Column from "./Column";
import { useDnD } from "@/contexts/DnDContext.jsx";
import Calculator from "@/components/ui/Widgets/Calculator/Calculator.jsx";
import { Calendar } from "@/components/ui/Widgets/calendar.jsx";
import SearchBar from "@/components/ui/Widgets/SearchBar/SearchBar.jsx";
import ClockWidget from "@/components/ui/Widgets/Clock/Clock.jsx";
import imageCarousel from "@/components/ui/Widgets/ImageCarousel/ImageCarousel.jsx";
import Note from "@/components/ui/Widgets/Note/Note.jsx";
import customLinks from "@/components/ui/Widgets/customLinks/CustomLinks.jsx";
import News from "@/components/ui/Widgets/News/News.jsx";
import ToDo from "@/components/ui/Widgets/ToDo/ToDo.jsx";
import WeatherWidget from "@/components/ui/Widgets/Weather/WeatherWidget.jsx";
import Style from "./ColumnLayout.module.css";

import { useColumns } from "@/hooks/useColumns.js";

const ColumnLayout = ({ columns, setColumns }) => {
    const [widgetType, setWidgetType] = useDnD();

    const widgetComponents = {
        calculator: Calculator,
        calendar: Calendar,
        searchBar: SearchBar,
        clock: ClockWidget,
        imageCarousel: imageCarousel,
        weather: WeatherWidget,
        note: Note,
        customLinks: customLinks,
        news: News,
        todoList: ToDo
    };

    const { onRemoveWidget, handleDropWidget, handlePositionUpdate } = useColumns({
        columns,
        setColumns,
        widgetComponents,
        setWidgetType
    });

    const findColumn = (id) => {
        if (!id) return null;
        return (
            columns.find((c) => c.id === id) ||
            columns.find((c) => c.cards.some((card) => card.id === id)) ||
            null
        );
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
                col.id === activeColumn.id
                    ? { ...col, cards: activeCards }
                    : col.id === overColumn.id
                        ? { ...col, cards: newOverCards }
                        : col
            );
        });
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;

        const activeColumn = findColumn(active.id);
        const overColumn = findColumn(over.id);
        if (!activeColumn || !overColumn) return;

        const activeWidget = activeColumn.cards.find((c) => c.id === active.id);
        if (!activeWidget) return;

        setColumns((prevColumns) => {
            let newColumns = prevColumns.map((col) => {
                let cards = [...col.cards];
                if (col.cards.some(c => c.id === active.id)) {
                    cards = cards.filter((c) => c.id !== active.id);
                }
                return { ...col, cards };
            });

            let targetColumn = newColumns.find((c) => c.id === overColumn.id);
            let overIndex = targetColumn.cards.findIndex((c) => c.id === over.id);
            if (overIndex === -1) overIndex = targetColumn.cards.length;

            targetColumn.cards.splice(overIndex, 0, activeWidget);

            return newColumns.map(col => col.id === targetColumn.id ? targetColumn : col);
        });

        const new_column_id = parseInt(overColumn.id.replace("Column", ""));
        const widget_id = parseInt(active.id.replace("widget-", ""));
        const targetIndex = overColumn.cards.findIndex((c) => c.id === over.id);

        handlePositionUpdate(widget_id, new_column_id, targetIndex === -1 ? overColumn.cards.length - 1 : targetIndex);
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
        >
            <div className={`${Style.columnContainer}`}>
                {columns.map((column) => (
                    <div key={column.id} style={{ width: `${column.width || 100 / columns.length}%` }}>
                        <Column
                            id={column.id}
                            title={column.title}
                            cards={column.cards}
                            onDropWidget={() => handleDropWidget(column.id, widgetType)}
                            onRemoveWidget={onRemoveWidget}
                        />
                    </div>
                ))}
            </div>
        </DndContext>
    );
};

export default ColumnLayout;
