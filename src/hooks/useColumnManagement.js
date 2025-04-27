import { useCallback } from 'react';
import { addColumn as apiAddColumn, deleteColumn as apiDeleteColumn, updateColumn as apiUpdateColumn } from '@/http/columnManagementService.js';

export const useColumns = (columns, setColumns) => {
    const addColumn = useCallback(async () => {
        if (columns.length >= 5) return;

        const newColumn = {
            title: '+',
            cards: [],
            width: 100 / (columns.length + 1),
            position: columns.length + 1,
        };

        setColumns([...columns, newColumn]);

        try {
            await apiAddColumn(newColumn);
        } catch (error) {
            console.error('Error adding column:', error);
        }
    }, [columns, setColumns]);

    const removeColumn = useCallback(
        async (index) => {
            if (columns.length <= 1) return;

            const columnToRemove = columns[index];
            const newColumns = columns.filter((_, i) => i !== index);

            setColumns(newColumns.map((col, i) => ({ ...col, id: `Column${i + 1}`, title: '+' })));

            try {
                await apiDeleteColumn(columnToRemove.id.replace('Column', ''));
            } catch (error) {
                console.error('Error removing column:', error);
            }
        },
        [columns, setColumns]
    );

    const updateColumnWidth = useCallback(
        async (index, value) => {
            const col = columns[index];
            const newWidth = Math.max(10, Math.min(100, Number(value)));

            try {
                await apiUpdateColumn(col.id.replace('Column', ''), {
                    width: newWidth,
                    position: index + 1,
                });
                setColumns(
                    columns.map((col, i) => (i === index ? { ...col, width: newWidth } : col))
                );
            } catch (error) {
                console.error('Error updating column width:', error);
            }
        },
        [columns, setColumns]
    );

    return { addColumn, removeColumn, updateColumnWidth };
};
