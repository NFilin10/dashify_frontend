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
            if (err.response?.status !== 404) {  // No city set is not an error here
                setError(err.response?.data?.message || err.message);
            }
        } finally {
            setLoading(false);
        }
    };





    return { weather, loading, error, fetchWeather, loadSavedWeather };
}
