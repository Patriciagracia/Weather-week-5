let apiKey = "17ad6e67aa629189f73b053634668b20";

// Exercise 1
function currentDayAndTime() {
  let liDayTime = document.querySelector("#day-time");
  let dayHour = new Date();
  let hours = dayHour.getHours().toString().padStart(2, "0");
  let minutes = dayHour.getMinutes().toString().padStart(2, "0");
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[dayHour.getDay()];
  let h2 = document.querySelector("h2");
  liDayTime.innerHTML = `${day} ${hours}:${minutes} h`;
}
currentDayAndTime();

// Exercise 2
//Función para que el usuario introduzca la ciudad en el formulario
function enterCity(event) {
  event.preventDefault();
  let enterInput = document.querySelector("#city-input");
  let h2 = document.querySelector("h2");
  h2.innerHTML = enterInput.value;
  let city = enterInput.value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(currentWeather);
}

let cityInput = document.querySelector("#search-form");
cityInput.addEventListener("submit", enterCity);
//Función para traducir coordenadas a ciudad
function getCityName(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let urlGeocoding = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  axios.get(urlGeocoding).then(function (response) {
    let cityName = response.data[0].name;
    let h2 = document.querySelector("h2");
    h2.innerHTML = cityName;
    let city = cityName;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(currentWeather);
  });
}

function position(event) {
  navigator.geolocation.getCurrentPosition(getCityName);
}

let currentCityButton = document.querySelector(`#load-current-location`);
currentCityButton.addEventListener("click", position);

// función para mostrar la temp de Zaragoza por defecto

function defaultCity() {
  let defaultCity = "Zaragoza";
  url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&appid=${apiKey}&units=metric`;
  axios.get(url).then(currentWeather);
}
defaultCity();

// Función para obtener temperatura en celsius y farenheit
function currentWeather(response) {
  let weather = document.querySelector("#number-degree");
  let temperature = Math.round(response.data.main.temp);
  weather.innerHTML = temperature;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  let farenheitElement = document.querySelector("#faren");
  farenheitElement.addEventListener("click", function () {
    setFarenheit(temperature);
  });

  let celsiusElement = document.querySelector("#celsius");
  celsiusElement.addEventListener("click", function () {
    setCelsius(temperature);
  });
}

function setFarenheit(temperature) {
  let newNumber = document.querySelector("#number-degree");
  newNumber.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function setCelsius(temperature) {
  let backToDegrees = document.querySelector("#number-degree");
  backToDegrees.innerHTML = temperature;
}
