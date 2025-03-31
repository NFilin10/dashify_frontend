import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Card = ({ id, title }) => {
    const { attributes, listeners, setNodeRef, transform } = useSortable({ id });

    const style = {
        margin: "10px",
        opacity: 1,
        color: "#333",
        background: "white",
        padding: "10px",
        transform: CSS.Transform.toString(transform),
    };

    return (
        <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
            <p>{title}</p>
        </div>
    );
};

export default Card;