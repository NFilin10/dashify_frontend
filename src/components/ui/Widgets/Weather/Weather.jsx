import React, { useState } from "react";
import styles from "./WeatherWidget.module.css";
import { useTheme } from "../../../Theme/theme-provider.jsx";

const API_KEY = "d1b360531b9a4befac05f96bafb940d4";

export default function WeatherWidget() {
    const { theme } = useTheme();

    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const getCoordinates = async (cityName) => {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/search?city=${cityName}&format=json&limit=1`
        );
        const data = await res.json();
        if (!data.length) throw new Error("City not found");
        return {
            lat: data[0].lat,
            lon: data[0].lon,
        };
    };

    const fetchWeather = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setWeather(null);

        try {
            const { lat, lon } = await getCoordinates(city);
            const res = await fetch(
                `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${API_KEY}`
            );
            const data = await res.json();
            if (!data.data || data.data.length === 0) {
                throw new Error("No weather data found.");
            }
            setWeather(data.data[0]);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const themeStyles = {
        '--bg': theme === 'dark' ? '#1a1a1a' : '#f5f5f5',
        '--card-bg': theme === 'dark' ? '#2b2b2b' : '#ffffff',
        '--text': theme === 'dark' ? '#e0e0e0' : '#1a1a1a',
        '--input-bg': theme === 'dark' ? '#2b2b2b' : '#ffffff',
        '--input-border': theme === 'dark' ? '#444' : '#ccc',
        '--button-bg': theme === 'dark' ? '#333' : '#e0e0e0',
        '--button-text': theme === 'dark' ? '#fff' : '#1a1a1a',
        '--button-disabled': theme === 'dark' ? '#444' : '#ccc',
        '--shadow': theme === 'dark'
            ? '0 4px 12px rgba(0, 0, 0, 0.3)'
            : '0 4px 12px rgba(0, 0, 0, 0.1)',
    };

    return (
        <div className={styles.widget} style={themeStyles}>
            <form onSubmit={fetchWeather} className={styles.form}>
                <input
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={styles.input}
                />
                <button type="submit" className={styles.button} disabled={loading}>
                    {loading ? "Loading..." : "Get Weather"}
                </button>
            </form>

            {error && <div className={styles.error}>{error}</div>}

            {weather && (
                <div className={styles.info}>
                    <h2>{weather.city_name}, {weather.country_code}</h2>
                    <p>{weather.weather.description}</p>
                    <p>🌡️ Temp: {weather.temp}°C</p>
                    <p>💧 Humidity: {weather.rh}%</p>
                    <p>💨 Wind: {weather.wind_spd} m/s {weather.wind_cdir_full}</p>
                    <p>☁️ Clouds: {weather.clouds}%</p>
                    <p>🕓 Updated: {weather.ob_time}</p>
                </div>
            )}
        </div>
    );
}
