const API_KEY = process.env.WEATHER_API_KEY;


export async function getCoordinates(cityName) {
    const res = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${cityName}&format=json&limit=1`
    );
    const data = await res.json();
    if (!data.length) throw new Error("City not found");
    return { lat: data[0].lat, lon: data[0].lon };
}

export async function getWeather(lat, lon) {
    const res = await fetch(
        `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${API_KEY}`
    );
    const data = await res.json();
    if (!data.data?.length) throw new Error("No weather data found.");
    return data.data[0];
}
