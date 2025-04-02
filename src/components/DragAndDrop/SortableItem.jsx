import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = ({ id, Component, data }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    return (
        <div
            ref={setNodeRef}
            style={{
                transform: CSS.Transform.toString(transform),
                transition,
                padding: "10px",
                background: "white",
                marginBottom: "5px",
                width: "fit-content",
                maxWidth: "100%",
            }}
            {...attributes}
            {...listeners}
        >
            {Component && <Component data={data} />}
        </div>
    );
};


export default SortableItem;