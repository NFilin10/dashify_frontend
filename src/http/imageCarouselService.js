import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api/widgets/image-carousel";


export const uploadImage = async (formData) => {
    return await axios.post(`${API_BASE_URL}/upload-carousel-image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
    });
};

export const getImages = async (widgetId) => {
    return await axios.get(`${API_BASE_URL}/get-carousel-images`, {
        params: { widgetId },
        withCredentials: true,
    });
};

export const deleteImage = async (imageId) => {
    return await axios.delete(`${API_BASE_URL}/delete-carousel-image`, {
        data: { imageId },
        withCredentials: true,
    });
};
