import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/columns';

export const addColumn = async (columnData) => {
    return axios.post(`${API_BASE_URL}/add-column`, columnData, { withCredentials: true });
};

export const deleteColumn = async (columnId) => {
    return axios.delete(`${API_BASE_URL}/delete-column/${columnId}`, { withCredentials: true });
};

export const updateColumn = async (columnId, data) => {
    return axios.put(`${API_BASE_URL}/update-column/${columnId}`, data, { withCredentials: true });
};
