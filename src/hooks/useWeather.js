import { useState } from "react";
import { getCoordinates, getWeather } from "./../http/weatherService.js";

export function useWeather() {
    const [loading, setLoading] = useState(false);
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");

    const fetchWeather = async (city) => {
        setLoading(true);
        setError("");
        setWeather(null);

        try {
            const { lat, lon } = await getCoordinates(city);
            const data = await getWeather(lat, lon);
            setWeather(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { weather, loading, error, fetchWeather };
}
