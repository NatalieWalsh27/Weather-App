let now = new Date();

let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

let dateAndTime = document.querySelector("#date-and-time");
dateAndTime.innerHTML = `${day} ${date} ${month}  ⎹  ${hour}:${minutes}`;

function showSearchTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let h3 = document.querySelector("#temperature");
  h3.innerHTML = `${temperature}`;
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-a-city");
  let h1City = document.querySelector("h1");
  h1City.innerHTML = city.value;
  let apiKey = "be81f193e065bf5feb2d944c7336968b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showSearchTemperature);
}

let form = document.querySelector("form");
form.addEventListener("submit", changeCity);

function changeToCelsius(event) {
  event.preventDefault();
  let temperatureDisplay = document.querySelector("#temperature");
  temperatureDisplay.innerHTML = 16;
}

function changeToFahrenheit(event) {
  event.preventDefault();
  let temperatureDisplay = document.querySelector("#temperature");
  temperatureDisplay.innerHTML = 61;
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changeToCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", changeToFahrenheit);

function showCurrentTemperature(response) {
  console.log(response.data.name);
  let h1 = document.querySelector("h1");
  let cityName = response.data.name;
  h1.innerHTML = `${cityName}`;
  let temperature = Math.round(response.data.main.temp);
  let h3 = document.querySelector("#temperature");
  h3.innerHTML = `${temperature}`;
}
function handlePosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getPosition);

function getPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function retrievePosition(position) {
  let apiKey = "be81f193e065bf5feb2d944c7336968b";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}
&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentTemperature);
}
