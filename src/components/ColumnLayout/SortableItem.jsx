import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, X } from "lucide-react";
import { useTheme } from "./../Theme/theme-provider.jsx";
import styles from "./SortableItem.module.css";

const SortableItem = ({ id, Component, data, onRemove }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const { theme } = useTheme();

    return (
        <div
            ref={setNodeRef}
            className={styles.sortableItem}
            style={{
                transform: CSS.Transform.toString(transform),
                transition,
            }}
        >
            <div
                {...attributes}
                {...listeners}
                className={styles.dragHandle}
            >
                <GripVertical
                    size={18}
                    color={theme === "dark" ? "gray" : "black"}
                />
            </div>

            <div
                className={styles.removeButton}
                onClick={() => onRemove(id)}
                title="Remove widget"
            >
                <X size={18} color="#f44336" />
            </div>

            {Component && <Component data={data} widget_id={parseInt(data.id.replace("widget-", ""))} className={styles.widgetComponent} />}
        </div>
    );
};


export default SortableItem;
