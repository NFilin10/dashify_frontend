import axios from "axios";

const API = "http://localhost:8080/api/widgets/weather";

export async function saveCity(widget_id, city) {
    const response = await axios.post(`${API}/save-city`, { widget_id, city });
    return response.data;
}

export async function getWeather(widget_id) {
    const response = await axios.get(`${API}/get-weather`, { params: { widget_id } });
    return response.data;
}
