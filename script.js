
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
  let apiKey = `1544e67f9b685a7d927f11b2e914bf96`
  let cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`
  let displayCity = document.querySelector(`#city`)
  displayCity.innerHTML = `${city.value}`
  axios.get(cityUrl).then(getWeather)
}

let searchCityButton = document.querySelector(".form-group");
searchCityButton.addEventListener("click", searchCity);


function locateMe(position) {

  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `1544e67f9b685a7d927f11b2e914bf96`
  let geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`

  axios.get(geoUrl).then(getWeather)
}

function fetchLocation() {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(locateMe)
}

let button = document.querySelector(`#geolocation`)
button.addEventListener(`click`, fetchLocation)





function getWeather(response) {
  let showTemp = document.querySelector(`#current-temp`)
  let currentTemp = Math.round(response.data.main.temp)
  showTemp.innerHTML = `${currentTemp} °C`
  city.innerHTML = `${response.data.name}`
  let tempMax = document.querySelector(`#today-high`)
  tempMax.innerHTML = `High ${Math.round(response.data.main.temp_max)} °C`
  let tempMin = document.querySelector(`#today-low`)
  tempMin.innerHTML = ` Low ${Math.round(response.data.main.temp_min)} °C`
  let feelsLike = document.querySelector(`#weather-description`)
  feelsLike.innerHTML = `${(response.data.weather[0].description)}`

}


let fahTemp = document.querySelector(`#fahrenheit - button`)
fahTemp.addEventListener(`click, convertToFah`)




