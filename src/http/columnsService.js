import axios from "axios";

const API_BASE = "http://localhost:8080/api/columns";

export const deleteWidget = async (widget_id) => {
    return axios.delete(`${API_BASE}/delete-widget`, {
        data: { widget_id },
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
    });
};

export const updateWidgetPosition = async (widget_id, new_column_id, new_position) => {
    return axios.put(`${API_BASE}/update-pos`, {
        widget_id,
        new_column_id,
        new_position
    }, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
    });
};

export const addWidget = async (column_id, type, position) => {
    return axios.post(`${API_BASE}/add-widget`, {
        column_id,
        type,
        position
    }, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
    });
};
