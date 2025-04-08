import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import SortableItem from "@/components/DragAndDrop/SortableItem.jsx";
import Style from './Column.module.css'

const Column = ({ id, title, cards, onDropWidget, onRemoveWidget }) => {
    const { setNodeRef } = useDroppable({ id });

    const handleDrop = (e) => {
        e.preventDefault();
        onDropWidget(id);
    };

    return (
        <div
            className={Style.column}
            ref={setNodeRef}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
        >
            {cards.length === 0 ? (
                <div className={Style.emptyColumn}>
                    <p>{title}</p>
                </div>
            ) : (
                <SortableContext items={cards.map((card) => card.id)} strategy={rectSortingStrategy}>
                    {cards.map((card) => (
                        <SortableItem
                            key={card.id}
                            id={card.id}
                            Component={card.Component}
                            data={card}
                            onRemove={() => onRemoveWidget(id, card.id)}
                        />
                    ))}
                </SortableContext>
            )}

        </div>
    );
};

export default Column;
