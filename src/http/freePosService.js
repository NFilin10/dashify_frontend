import axios from 'axios';

const API_URL = 'http://localhost:8080/api/free-pos';

export const fetchWidgetPositions = async () => {
    try {
        const response = await axios.get(`${API_URL}/get-widget-positions`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching widget positions:", error);
        throw error;
    }
};

export const addWidget = async (widgetType) => {
    try {
        const response = await axios.post(
            `${API_URL}/add-widget`,
            { widget_type: widgetType },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        console.error("Error adding widget:", error);
        throw error;
    }
};

export const addWidgetPosition = async (widgetId, position) => {
    try {
        await axios.post(
            `${API_URL}/add-widget-position`,
            { widget_id: widgetId, x: position.x, y: position.y },
            { withCredentials: true }
        );
    } catch (error) {
        console.error("Error adding widget position:", error);
        throw error;
    }
};

export const updateWidgetPosition = async (widgetId, position) => {
    try {
        await axios.put(
            `${API_URL}/update-widget-position`,
            { widget_id: widgetId, x: position.x, y: position.y },
            { withCredentials: true }
        );
    } catch (error) {
        console.error("Error updating widget position:", error);
        throw error;
    }
};

export const deleteWidget = async (widgetId) => {
    try {
        await axios.delete(
            `${API_URL}/delete-widget`,
            {
                data: { widget_id: widgetId },
                withCredentials: true,
            }
        );
    } catch (error) {
        console.error("Error deleting widget:", error);
        throw error;
    }
};
