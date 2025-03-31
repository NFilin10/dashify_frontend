import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const FreeformContainer = ({ widgets, onDropWidget }) => {
    const handleDrop = (event) => {
        const { clientX, clientY } = event;
        onDropWidget({ x: clientX, y: clientY });
    };

    return (
        <div
            style={{ position: "relative", height: "100%", background: "#f5f7f9" }}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
        >
            {widgets.map((widget) => (
                <Widget key={widget.id} widget={widget} />
            ))}
        </div>
    );
};

const Widget = ({ widget }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: widget.id });

    const style = {
        position: "absolute",
        left: widget.position.x,
        top: widget.position.y,
        transform: CSS.Transform.toString(transform),
        transition: transition || "transform 0.25s ease-in-out",
    };

    return (
        <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
            <widget.Component />
        </div>
    );
};

export default FreeformContainer;
