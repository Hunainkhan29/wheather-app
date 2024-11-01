const submitBtn = document.getElementById('submitBtn');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');
const errorElement = document.getElementById('errorElement');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const weatherIcon = document.getElementById('weatherIcon');
const apiKey = '68438c9887e15d1b91bdf784fbadf7c0'; // Replace with your actual OpenWeatherMap API key

// Hide weather info and error message initially
weatherInfo.classList.add('hidden');
errorElement.classList.add('hidden');

submitBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city === "") {
        displayError("Please enter a city name.");
        return;
    }

    getWeatherData(city);
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    try {
        const response = await fetch(apiUrl);
        console.log(response); // Log the response object
        if (!response.ok) throw new Error('City not found');

        const data = await response.json();
        console.log(data); // Log the received data
        displayWeather(data);
        hideError();
    } catch (error) {
        displayError(error.message);
    }
}


function displayWeather(data) {
    const temp = Math.round(data.main.temp);
    const weatherDescription = data.weather[0].description;
    const iconCode = data.weather[0].icon;

    cityName.textContent = data.name;
    temperature.textContent = `${temp}°C`;
    description.textContent = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
    weatherIcon.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherInfo.classList.remove('hidden');
    weatherInfo.style.opacity = "1";
}

function displayError(message) {
    weatherInfo.classList.add('hidden');
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
}

function hideError() {
    errorElement.classList.add('hidden');
}
