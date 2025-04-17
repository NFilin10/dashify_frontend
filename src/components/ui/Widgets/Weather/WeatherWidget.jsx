import React, {useEffect, useState} from "react";
import { useWeather } from "@/hooks/useWeather.js";
import { useTheme } from "../../../Theme/theme-provider";
import styles from "./WeatherWidget.module.css";

function WeatherWidget({ id }) {
    const { theme } = useTheme();
    const [city, setCity] = useState("");
    const { weather, loading, error, fetchWeather, loadSavedWeather } = useWeather(id);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) {
            fetchWeather(city);
        }
    };

    const themeClass = theme === "dark" ? styles.dark : styles.light;

    useEffect(() => {
        console.log("here" + id)
        loadSavedWeather(city);
    }, [id]);


    return (
        <div className={`${styles.widget} ${themeClass}`}>
            <form onSubmit={handleSubmit} className={styles.form}>
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
                    <h2>
                        {weather.city_name}, {weather.country_code}
                    </h2>
                    <p>{weather.weather.description}</p>
                    <p>🌡️ Temp: {weather.temp}°C</p>
                    <p>💧 Humidity: {weather.rh}%</p>
                    <p>
                        💨 Wind: {weather.wind_spd} m/s {weather.wind_cdir_full}
                    </p>
                    <p>☁️ Clouds: {weather.clouds}%</p>
                    <p>🕓 Updated: {weather.ob_time}</p>
                </div>
            )}
        </div>
    );
}

export default WeatherWidget;
