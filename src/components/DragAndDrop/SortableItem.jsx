import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, X } from "lucide-react"; // Import X icon for remove
import { useTheme } from "./../Theme/theme-provider.jsx"; // Import the theme context

const SortableItem = ({ id, Component, data, onRemove }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const { theme } = useTheme(); // Get the current theme from context

    return (
        <div
            ref={setNodeRef}
            style={{
                transform: CSS.Transform.toString(transform),
                transition,
                padding: "10px",
                background: theme === "dark" ? "#333" : "white", // Dark mode background is dark gray, light mode is white
                marginBottom: "5px",
                width: "100%",
                maxWidth: "100%",
                position: "relative",
                border: "1px solid #ddd",
                borderRadius: "8px",
            }}
        >
            {/* Drag handle */}
            <div
                {...attributes}
                {...listeners}
                style={{
                    cursor: "grab",
                    position: "absolute",
                    top: "5px",
                    right: "30px",
                    padding: "5px",
                }}
            >
                <GripVertical
                    size={18}
                    color={theme === "dark" ? "white" : "black"} // Change color based on theme
                />
            </div>

            {/* Remove button */}
            <div
                style={{
                    cursor: "pointer",
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    padding: "5px",
                }}
                onClick={() => onRemove(id)}
                title="Remove widget"
            >
                <X size={18} color="#f44336" />
            </div>

            {Component && <Component data={data} />}
        </div>
    );
};

export default SortableItem;
