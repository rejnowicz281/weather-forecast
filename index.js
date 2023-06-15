const API_KEY = "acd9b826be8b4efa91c191551231406";
const cityInput = document.getElementById("city-input");
const feedback = document.querySelector(".feedback");
const weatherContainer = document.querySelector(".weather-container");

async function getWeatherInfo() {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityInput.value}`);
    const data = await response.json();
    return data;
}

function giveFeedback() {
    weatherContainer.classList.add("d-none");
    feedback.classList.remove("d-none");
    feedback.textContent = "Type in a city.";
}

async function renderWeather() {
    try {
        let weatherInfo = await getWeatherInfo();

        const cityName = document.getElementById("city-name");
        const countryName = document.getElementById("country-name");
        const lastUpdated = document.getElementById("last-updated");
        const currentTemp = document.getElementById("current-temp");
        const currrentPerceptibleTemp = document.getElementById("current-perceptible-temp");
        const currentCondition = document.getElementById("current-condition");
        const moonrise = document.getElementById("moonrise");
        const moonset = document.getElementById("moonset");
        const sunrise = document.getElementById("sunrise");
        const sunset = document.getElementById("sunset");
        const avgTemp = document.getElementById("avg-temp");
        const maxTemp = document.getElementById("max-temp");
        const minTemp = document.getElementById("min-temp");
        const avgHumidity = document.getElementById("avg-humidity");
        const forecastHourContainer = document.querySelector(".forecast-hour-container");

        forecastHourContainer.innerHTML = "";
        feedback.classList.add("d-none");
        weatherContainer.classList.remove("d-none");

        cityName.textContent = weatherInfo.location.name;
        countryName.textContent = weatherInfo.location.country;
        lastUpdated.textContent = weatherInfo.current.last_updated;
        currentTemp.textContent = `${weatherInfo.current.temp_c}°C`;
        currrentPerceptibleTemp.textContent = `${weatherInfo.current.feelslike_c}°C`;
        currentCondition.textContent = weatherInfo.current.condition.text;
        moonrise.textContent = weatherInfo.forecast.forecastday[0].astro.moonrise;
        moonset.textContent = weatherInfo.forecast.forecastday[0].astro.moonset;
        sunrise.textContent = weatherInfo.forecast.forecastday[0].astro.sunrise;
        sunset.textContent = weatherInfo.forecast.forecastday[0].astro.sunset;
        avgTemp.textContent = `${weatherInfo.forecast.forecastday[0].day.avgtemp_c}°C`;
        maxTemp.textContent = `${weatherInfo.forecast.forecastday[0].day.maxtemp_c}°C`;
        minTemp.textContent = `${weatherInfo.forecast.forecastday[0].day.mintemp_c}°C`;
        avgHumidity.textContent = `${weatherInfo.forecast.forecastday[0].day.avghumidity}%`;

        weatherInfo.forecast.forecastday[0].hour.forEach((hour) => {
            const forecastHour = document.createElement("div");
            forecastHour.classList.add("forecast-hour");

            let time = hour.time.split(" ")[1];

            const forecastHourTime = document.createElement("div");
            const forecastHourTemp = document.createElement("div");
            const forecastHourCondition = document.createElement("div");
            forecastHourTime.textContent = time;
            forecastHourTemp.textContent = `${hour.temp_c}°C`;
            forecastHourCondition.textContent = hour.condition.text;

            forecastHour.appendChild(forecastHourTime);
            forecastHour.appendChild(forecastHourTemp);
            forecastHour.appendChild(forecastHourCondition);

            forecastHourContainer.appendChild(forecastHour);
        });
        console.log(weatherInfo);
    } catch {
        giveFeedback();
    }
}

giveFeedback();

cityInput.addEventListener("input", () => {
    renderWeather();
});
