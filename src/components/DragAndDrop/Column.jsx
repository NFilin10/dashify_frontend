import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import SortableItem from "@/components/DragAndDrop/SortableItem.jsx";
import Style from './Column.module.css'

const Column = ({ id, title, cards, onDropWidget }) => {
    const { setNodeRef } = useDroppable({ id });

    const handleDrop = (e) => {
        e.preventDefault();
        onDropWidget(id); // Add widget to column on drop
    };

    return (
        <div
            className={Style.column}
            ref={setNodeRef}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
        >
            <p style={{ padding: "5px 20px", textAlign: "left", fontWeight: "500", color: "#575757" }}>
                {title}
            </p>
            <SortableContext items={cards.map((card) => card.id)} strategy={rectSortingStrategy}>
                {cards.map((card) => (
                    <SortableItem key={card.id} id={card.id} Component={card.Component} data={card} />
                ))}
            </SortableContext>

        </div>
    );
};

export default Column;
