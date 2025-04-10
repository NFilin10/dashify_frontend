import { closestCorners, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Column from "./Column";
import { useDnD } from "@/contexts/DnDContext.jsx";
import Calculator from "@/components/ui/Widgets/Calculator/Calculator.jsx";
import { Calendar } from "@/components/ui/Widgets/calendar.jsx";
import SearchBar from "@/components/ui/Widgets/SearchBar/SearchBar.jsx";
import Style from "./ColumnLayout.module.css";
import ClockWidget from "@/components/ui/Widgets/Clock/Clock.jsx";
import imageCarousel from "@/components/ui/Widgets/ImageCarousel/ImageCarousel.jsx";
import Note from "@/components/ui/Widgets/Note/Note.jsx";
import customLinks from "@/components/ui/Widgets/customLinks/CustomLinks.jsx";
import News from "@/components/ui/Widgets/News/News.jsx";
import ToDo from "@/components/ui/Widgets/ToDo/ToDo.jsx";
import WeatherWidget from "@/components/ui/Widgets/Weather/WeatherWidget.jsx";

const ColumnLayout = ({ columns, setColumns }) => {
    const [widgetType, setWidgetType] = useDnD();

    const findColumn = (id) => {
        if (!id) return null;
        return (
            columns.find((c) => c.id === id) ||
            columns.find((c) => c.cards.some((card) => card.id === id)) ||
            null
        );
    };

    const onRemoveWidget = (columnId, cardId) => {
        setColumns((prevColumns) =>
            prevColumns.map((col) =>
                col.id === columnId
                    ? { ...col, cards: col.cards.filter((c) => c.id !== cardId) }
                    : col
            )
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

        setColumns((prevColumns) => {
            let activeWidget = activeColumn.cards.find((c) => c.id === active.id);
            if (!activeWidget) return prevColumns;

            let newColumns = prevColumns.map((col) => ({
                ...col,
                cards: col.id === activeColumn.id ? col.cards.filter((c) => c.id !== active.id) : col.cards,
            }));

            return newColumns.map((col) =>
                col.id === overColumn.id
                    ? { ...col, cards: [...col.cards, activeWidget] }
                    : col
            );
        });
    };

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

    const handleDropWidget = (columnId) => {
        if (!widgetType) return;

        const newWidget = {
            id: `${widgetType}-${Date.now()}`,
            type: widgetType,
            Component: widgetComponents[widgetType] || null,
        };

        setColumns((prevColumns) =>
            prevColumns.map((col) =>
                col.id === columnId ? { ...col, cards: [...col.cards, newWidget] } : col
            )
        );

        setWidgetType(null);
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
                            onDropWidget={handleDropWidget}
                            onRemoveWidget={onRemoveWidget}
                        />
                    </div>
                ))}
            </div>
        </DndContext>
    );
};


export default ColumnLayout;