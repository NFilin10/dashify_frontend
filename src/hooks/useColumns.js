import { deleteWidget, updateWidgetPosition, addWidget } from "@/http/columnsService.js";

export const useColumns = ({ columns, setColumns, widgetComponents, setWidgetType }) => {
    const onRemoveWidget = async (columnId, cardId) => {
        setColumns((prev) =>
            prev.map((col) =>
                col.id === columnId
                    ? { ...col, cards: col.cards.filter((c) => c.id !== cardId) }
                    : col
            )
        );

        try {
            await deleteWidget(parseInt(cardId.replace("widget-", "")));
        } catch (err) {
            console.error("Error deleting widget:", err);
        }
    };

    const handleDropWidget = async (columnId, widgetType) => {
        if (!widgetType) return;

        const currentColumn = columns.find(col => col.id === columnId);
        const position = currentColumn ? currentColumn.cards.length : 0;

        try {
            const res = await addWidget(parseInt(columnId.replace("Column", "")), widgetType, position);
            const { widgetId } = res.data;

            if (widgetId) {
                const newWidget = {
                    id: `widget-${widgetId}`,
                    type: widgetType,
                    Component: widgetComponents[widgetType] || null,
                };

                setColumns(prev =>
                    prev.map(col =>
                        col.id === columnId ? { ...col, cards: [...col.cards, newWidget] } : col
                    )
                );
            }
        } catch (err) {
            console.error("Error saving widget:", err);
        }

        setWidgetType(null);
    };

    const handlePositionUpdate = async (widget_id, new_column_id, targetIndex) => {
        try {
            await updateWidgetPosition(widget_id, new_column_id, targetIndex);
        } catch (err) {
            console.error("Error updating widget position:", err);
        }
    };

    return { onRemoveWidget, handleDropWidget, handlePositionUpdate };
};
