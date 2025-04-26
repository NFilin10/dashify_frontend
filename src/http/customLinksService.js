import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/widgets/custom-links";

export const getLinks = async (customLinkId) => {
    const response = await axios.get(`${API_BASE_URL}/get-link`, {
        params: { custom_link_id: customLinkId }
    });
    return response.data;
};

export const addLink = async (customLinkId, link) => {
    const response = await axios.post(`${API_BASE_URL}/add-link`, {
        custom_link_id: customLinkId,
        link: link
    });
    return response.data;
};

export const deleteLink = async (linkId) => {
    const response = await axios.delete(`${API_BASE_URL}/delete-link`, {
        data: { link_id: linkId }
    });
    return response.data;
};
