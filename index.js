const API_KEY = "acd9b826be8b4efa91c191551231406";
let city = "Kielce";

async function getCurrentWeather() {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`);
    const data = await response.json();
    console.log(data);
    return data;
}

// getCurrentWeather();
