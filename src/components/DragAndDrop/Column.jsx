import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import Card from "./Card";

const Column = ({ id, title, cards, onDropWidget }) => {
    const { setNodeRef } = useDroppable({ id });

    const handleDrop = (e) => {
        e.preventDefault();
        onDropWidget(id); // Add widget to column on drop
    };

    return (
        <div
            ref={setNodeRef}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            style={{ width: "200px", background: "#f5f7f9", marginRight: "10px" }}
        >
            <p style={{ padding: "5px 20px", textAlign: "left", fontWeight: "500", color: "#575757" }}>
                {title}
            </p>
            {cards.map((card) => (
                <div key={card.id}>
                    {/* Dynamically render the widget component based on its type */}
                    {card.Component && <card.Component data={card} />}
                </div>
            ))}
        </div>
    );
};

export default Column;

