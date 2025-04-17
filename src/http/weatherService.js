import axios from "axios";

const API = "http://localhost:8080/widgets/weather";

// Save city for a widget
export async function saveCity(widget_id, city) {
    const response = await axios.post(`${API}/save-city`, { widget_id, city });
    return response.data;
}

// Fetch weather for a widget_id
export async function getWeather(widget_id) {
    const response = await axios.get(`${API}/get-weather`, { params: { widget_id } });
    return response.data;
}
