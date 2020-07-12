//TIME AND DATE IN H1

let now = new Date();
now.getDay();
let days = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`,
];

let weekDay = days[now.getDay()];
now.getMonth();
let months = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

let month = months[now.getMonth()];
let monthDay = now.getDate();
let nowDate = document.querySelector("#current-date");
let hour = now.getHours();
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute} `;
}
let nowTime = document.querySelector("#current-time");
let formatDate = `${weekDay}, ${month} ${monthDay}`;
let formatTime = `${hour}:${minute}`;
nowTime.innerHTML = `${formatTime}`;
nowDate.innerHTML = `${formatDate}`;

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute} `;
  }
  return `${hour}:${minute}`;
}

// add a required field function here
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  let apiKey = `1544e67f9b685a7d927f11b2e914bf96`;
  let cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  let forecastCityUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city.value}&appid=${apiKey}&units=metric`;
  let displayCity = document.querySelector(`#city`);
  displayCity.innerHTML = `${city.value}`;
  axios.get(cityUrl).then(getWeather);
  axios.get(forecastCityUrl).then(getForecast);
}

let searchCityButton = document.querySelector(".form-group");
searchCityButton.addEventListener("click", searchCity);

function locateMe(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `1544e67f9b685a7d927f11b2e914bf96`;
  let geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  let forecastGeoUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(geoUrl).then(getWeather);
  axios.get(forecastGeoUrl).then(getForecast);
}

function fetchLocation() {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(locateMe);
}

let button = document.querySelector(`#geolocation`);
button.addEventListener(`click`, fetchLocation);

function getWeather(response) {
  let showTemp = document.querySelector(`#current-temp`);
  let currentTemp = Math.round(response.data.main.temp);
  let tempMax = document.querySelector(`#current-high`);
  let tempMin = document.querySelector(`#current-low`);
  let feelsLike = document.querySelector(`#weather-description`);
  let iconElement = document.querySelector(`#weather-icon-now`);

  showTemp.innerHTML = `${currentTemp}`;
  city.innerHTML = `${response.data.name}`;
  tempMax.innerHTML = `${Math.round(response.data.main.temp_max)}`;
  tempMin.innerHTML = `${Math.round(response.data.main.temp_min)}`;
  feelsLike.innerHTML = `${response.data.weather[0].description}`;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

//forecast

function getForecast(response) {
  let forecastElement = document.querySelector(`#forecast`);
  let forecast = response.data.list[0];
  forecastElement.innerHTML = `
  <li class="media" id="forecast-element">
    <img src = "https://openweathermap.org/img/wn/${
      forecast.weather[0].icon
    }@2x.png" alt = "#" ></i>
    <div class="media-body">
      <h5 class="mt-0 mb-1">
     ${formatHours(forecast.dt * 1000)}
      </h5>
      <div>
        <div class="temperature"> High  <span id="tomorrow-hi">${Math.round(
          forecast.main.temp_max
        )} °C </span> | Low <span id="tomorrow-lo" >${Math.round(
    forecast.main.temp_min
  )} °C</span>
        </div>
               Humidity: ${forecast.main.humidity} % | Wind: ${Math.round(
    response.data.list[0].wind.speed
  )} m/s
      </div>
  </li>
    `;

  forecast = response.data.list[1];
  forecastElement.innerHTML =
    forecastElement.innerHTML +
    `
  <li class="media" id="forecast-element">
    <img src = "https://openweathermap.org/img/wn/${
      forecast.weather[1].icon
    }@2x.png" alt = "#" ></i>
    <div class="media-body">
      <h5 class="mt-0 mb-1">
     ${formatHours(response.data.list[1].dt * 1000)}
      </h5>
      <div>
        <div class="temperature"> High  <span id="tomorrow-hi">${Math.round(
          forecast.main.temp_max
        )} °C </span> | Low <span id="tomorrow-lo" >${Math.round(
      forecast.main.temp_min
    )} °C</span>
        </div>
               Humidity: ${forecast.main.humidity} % | Wind: ${Math.round(
      response.data.list[1].wind.speed
    )} m/s
      </div>
  </li>
    `;
}

// end of forecast

let tempType = `celsius`;
function fahrenheitFormula(celsius) {
  return Math.round((parseInt(celsius) * 9) / 5) + 32;
}
function celsiusFormula(fahrenheit) {
  return Math.round(((parseInt(fahrenheit) - 32) * 5) / 9);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  if (tempType == `fahrenheit`) {
    return;
  }

  let getCurrentTemp = document.querySelector(`#current-temp`);
  let getTomorrowHi = document.querySelector(`#tomorrow-hi`);
  let getTomorrowLo = document.querySelector(`#tomorrow-lo`);
  let getCurrentHi = document.querySelector(`#current-high`);
  let getCurrentLo = document.querySelector(`#current-low`);

  getCurrentTemp.innerHTML = fahrenheitFormula(getCurrentTemp.innerHTML);
  getTomorrowHi.innerHTML = `${fahrenheitFormula(getTomorrowHi.innerHTML)}°F`;
  getTomorrowLo.innerHTML = `${fahrenheitFormula(getTomorrowLo.innerHTML)} °F`;
  getCurrentHi.innerHTML = `${fahrenheitFormula(getCurrentHi.innerHTML)}°F`;
  getCurrentLo.innerHTML = `${fahrenheitFormula(getCurrentLo.innerHTML)}°F`;
  tempType = `fahrenheit`;
}

let fahTemp = document.querySelector(`#fahrenheit`);
fahTemp.addEventListener(`click`, convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  if (tempType == `celsius`) {
    return;
  }

  let getCurrentTemp = document.querySelector(`#current-temp`);
  let getTomorrowHi = document.querySelector(`#tomorrow-hi`);
  let getTomorrowLo = document.querySelector(`#tomorrow-lo`);
  let getCurrentHi = document.querySelector(`#current-high`);
  let getCurrentLo = document.querySelector(`#current-low`);

  getCurrentTemp.innerHTML = celsiusFormula(getCurrentTemp.innerHTML);
  getTomorrowHi.innerHTML = `${celsiusFormula(getTomorrowHi.innerHTML)} °C`;
  getTomorrowLo.innerHTML = `${celsiusFormula(getTomorrowLo.innerHTML)} °C`;
  getCurrentHi.innerHTML = `${celsiusFormula(getCurrentHi.innerHTML)}°C`;
  getCurrentLo.innerHTML = `${celsiusFormula(getCurrentLo.innerHTML)}°C`;
  tempType = `celsius`;
}

let celsTemp = document.querySelector(`#celsius`);
celsTemp.addEventListener(`click`, convertToCelsius);
