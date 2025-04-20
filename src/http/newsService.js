import axios from 'axios';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

export const fetchNewsArticles = async (pageSize = 10, country = 'us') => {
    try {
        const response = await axios.get(`${BASE_URL}/top-headlines`, {
            params: {
                country,
                pageSize,
                apiKey: API_KEY
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch news articles');
    }
};
