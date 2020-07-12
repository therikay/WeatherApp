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
let nowTime = document.querySelector("#current-time");
let formatDate = `${weekDay}, ${month} ${monthDay}`;
let formatTime = `${hour}:${minute}`;
nowTime.innerHTML = `${formatTime}`;
nowDate.innerHTML = `${formatDate}`;

//tomorrow forecast

// add a required field function here
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  let apiKey = `1544e67f9b685a7d927f11b2e914bf96`;
  let cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  let displayCity = document.querySelector(`#city`);
  displayCity.innerHTML = `${city.value}`;
  axios.get(cityUrl).then(getWeather);
}

let searchCityButton = document.querySelector(".form-group");
searchCityButton.addEventListener("click", searchCity);

function locateMe(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `1544e67f9b685a7d927f11b2e914bf96`;
  let geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(geoUrl).then(getWeather);
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
  let tempMax = document.querySelector(`#today-high`);
  let tempMin = document.querySelector(`#today-low`);
  let feelsLike = document.querySelector(`#weather-description`);
  let iconElement = document.querySelector(`#weather-icon-now`);

  showTemp.innerHTML = `${currentTemp}`;
  city.innerHTML = `${response.data.name}`;
  tempMax.innerHTML = `High ${Math.round(response.data.main.temp_max)} °C`;
  tempMin.innerHTML = ` Low ${Math.round(response.data.main.temp_min)} °C`;
  feelsLike.innerHTML = `${response.data.weather[0].description}`;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

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

  //let fahrenheit =
  //Math.round((parseInt(getCurrentTemp.innerHTML) * 9) / 5) + 32;

  getCurrentTemp.innerHTML = fahrenheitFormula(getCurrentTemp.innerHTML);

  getTomorrowHi.innerHTML = fahrenheitFormula(getTomorrowHi.innerHTML);

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

  getCurrentTemp.innerHTML = celsiusFormula(getCurrentTemp.innerHTML);
  getTomorrowHi.innerHTML = celsiusFormula(getTomorrowHi.innerHTML);
  getTomorrowLo.innerHTML = celsiusFormula(getTomorrowLo.innerHTML);
  tempType = `celsius`;
}

let celsTemp = document.querySelector(`#celsius`);
celsTemp.addEventListener(`click`, convertToCelsius);
