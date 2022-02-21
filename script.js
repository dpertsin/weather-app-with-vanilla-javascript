// API Key (you can put your own key here from openweathermap.org)
const myAppId = "";

// SELECT ELEMENTS
const weatherImgElement = document.querySelector(".weather-img");
const weatherElement = document.querySelector(".weather");
const tempElement = document.querySelector(".temperature");
const dayElement = document.querySelector(".day");
const locationElement = document.querySelector(".location");

// App data
const weather = {};

weather.temperature = {
    unit: "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273;
const event = new Date();
const options = { weekday: "long", year: "numeric", month: "long", day: "numeric"};

// Check if the browser supports geolocation
if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// Set user's position
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// Get weather from API provider (openweathermap.org)
function getWeather(latitude, longitude){
    let weatherApi = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${myAppId}`;

    fetch(weatherApi)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
            weather.day = event.toLocaleDateString(undefined, options);
        })
        .then(function(){
            displayWeather();
        });
}

// Display weather to front end
function displayWeather(){
    weatherImgElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    weatherElement.innerHTML = weather.description;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
    dayElement.innerHTML = `${weather.day}`;
}
