import { useEffect } from 'react';
import { getWidgetPositions } from '@/http/freePosService.js';

const useFreePos = (handleRemoveNode, setNodes) => {
    useEffect(() => {
        const fetchWidgets = async () => {
            try {
                const response = await getWidgetPositions();
                const positions = response.data;

                const restoredNodes = positions.map((pos) => ({
                    id: String(pos.widget_id),
                    type: 'widgetNode',
                    position: { x: pos.x, y: pos.y },
                    data: {
                        widget_id: String(pos.widget_id),
                        type: pos.widget_type,
                        onRemove: handleRemoveNode,
                    },
                }));

                setNodes(restoredNodes);
            } catch (err) {
                console.error('Failed to load widget positions:', err);
            }
        };

        fetchWidgets();
    }, [handleRemoveNode, setNodes]);
};

export default useFreePos;
