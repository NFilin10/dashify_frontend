import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react"; // Import an icon for dragging

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
                position: "relative",
                border: "1px solid #ddd",
                borderRadius: "8px",
            }}
        >
            <div
                {...attributes}
                {...listeners}
                style={{
                    cursor: "grab",
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    padding: "5px",
                }}
            >
                <GripVertical size={18} />
            </div>

            {Component && <Component data={data} />}
        </div>
    );
};

export default SortableItem;
