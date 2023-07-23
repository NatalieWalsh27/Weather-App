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

if (hour < 10) {
  hour = "0" + hour;
}
if (minutes < 10) {
  minutes = "0" + minutes;
}

let dateAndTime = document.querySelector("#date-and-time");
dateAndTime.innerHTML = `${day} ${date} ${month}  ⎹  ${hour}:${minutes}`;

function showSearchTemperature(response) {
  console.log(response.data);
  let description = response.data.weather[0].description;
  let h2Description = document.querySelector("#description");
  h2Description.innerHTML = description;

  let temperature = Math.round(response.data.main.temp);
  let h3 = document.querySelector("#temperature");
  h3.innerHTML = `${temperature}`;

  let precipitation = 0;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let UV = 5;

  let sunrise = response.data.sys.sunrise * 1000;
  let sunset = response.data.sys.sunset * 1000;
  let sunriseDate = new Date(sunrise);
  let sunriseHours = sunriseDate.getHours();
  let sunriseMinutes = sunriseDate.getMinutes();
  let sunsetDate = new Date(sunset);
  let sunsetHours = sunsetDate.getHours();
  let sunsetMinutes = sunsetDate.getMinutes();

  if (sunriseHours < 10) {
    sunriseHours = "0" + sunriseHours;
  }
  if (sunriseMinutes < 10) {
    sunriseMinutes = "0" + sunriseMinutes;
  }
  if (sunsetHours < 10) {
    sunsetHours = "0" + sunsetHours;
  }
  if (sunsetMinutes < 10) {
    sunsetMinutes = "0" + sunsetMinutes;
  }

  let h3Details = document.querySelector("#h3-details");
  h3Details.innerHTML = `Precipitation ${precipitation}%<br> Humidity ${humidity}%<br> Wind ${wind}kph`;
  let h3Details2 = document.querySelector("#h3-details2");
  h3Details2.innerHTML = `UV ${UV}<br> Sunrise ${sunriseHours}:${sunriseMinutes}<br> Sunset ${sunsetHours}:${sunsetMinutes}`;
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
