import { useState, useEffect } from "react";
import { saveCity, getWeather } from "../http/weatherService.js";

export function useWeather(widgetId) {
    const [loading, setLoading] = useState(false);
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");

    const fetchWeather = async (city) => {
        setLoading(true);
        setError("");
        setWeather(null);
        try {
            await saveCity(widgetId, city);
            const data = await getWeather(widgetId);
            setWeather(data);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    const loadSavedWeather = async () => {
        setLoading(true);
        setError("");
        try {
            const data = await getWeather(widgetId);
            setWeather(data);
        } catch (err) {
            if (err.response?.status !== 404) {
                setError(err.response?.data?.message || err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (widgetId) {
            console.log("Loading saved weather for:", widgetId);
            loadSavedWeather();
        }
    }, [widgetId]);

    return { weather, loading, error, fetchWeather };
}
