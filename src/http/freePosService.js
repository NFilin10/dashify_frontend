import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/free-pos',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export const deleteWidget = (widgetId) => {
    return api.delete('/delete-widget', { data: { widget_id: widgetId } });
};

export const addWidget = (widgetType) => {
    return api.post('/add-widget', { widget_type: widgetType });
};

export const addWidgetPosition = (widgetId, position) => {
    return api.post('/add-widget-position', { widget_id: widgetId, ...position });
};

export const updateWidgetPosition = (widgetId, position) => {
    return api.put('/update-widget-position', { widget_id: widgetId, ...position });
};

export const getWidgetPositions = () => {
    return api.get('/get-widget-positions');
};
