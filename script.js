function formatDate(timestamp) {
  let date = new Date(timestamp);

  let hour = date.getHours();
  if (hour < 10) {
    hour = "0" + hour;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  let dateNumber = date.getDate();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

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
  let month = months[date.getMonth()];

  return `Last Updated: ${day} ${dateNumber} ${month}  ⎹  ${hour}:${minutes}`;
}

function showSearchTemperature(response) {
  let description = response.data.condition.description;
  let h2Description = document.querySelector("#description");
  let dateElement = document.querySelector("#date-and-time");
  let iconElement = document.querySelector("#icon");
  h2Description.innerHTML = description;
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute("src", `${response.data.condition.icon_url}`);

  celsiusTemperature = response.data.temperature.current;

  let temperature = Math.round(celsiusTemperature);
  let h3 = document.querySelector("#temperature");
  h3.innerHTML = `${temperature}`;

  let precipitation = 0;
  let humidity = response.data.temperature.humidity;
  let wind = Math.round(response.data.wind.speed);
  let UV = 5;

  //let sunrise = response.data.sys.sunrise * 1000;
  //let sunset = response.data.sys.sunset * 1000;
  //let sunriseDate = new Date(sunrise);
  //let sunriseHours = sunriseDate.getHours();
  //let sunriseMinutes = sunriseDate.getMinutes();
  //let sunsetDate = new Date(sunset);
  //let sunsetHours = sunsetDate.getHours();
  //let sunsetMinutes = sunsetDate.getMinutes();

  //if (sunriseHours < 10) {
  //  sunriseHours = "0" + sunriseHours;
  //}
  //if (sunriseMinutes < 10) {
  // sunriseMinutes = "0" + sunriseMinutes;
  //}
  //if (sunsetHours < 10) {
  //sunsetHours = "0" + sunsetHours;
  //}
  //if (sunsetMinutes < 10) {
  // sunsetMinutes = "0" + sunsetMinutes;
  //}

  let h3Details = document.querySelector("#h3-details");
  h3Details.innerHTML = `Precipitation ${precipitation}%<br> Humidity ${humidity}%<br> Wind ${wind}km/h`;
  let h3Details2 = document.querySelector("#h3-details2");
  h3Details2.innerHTML = `UV ${UV}<br> Sunrise 00:00<br> Sunset 00:00`;
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-a-city");
  let h1City = document.querySelector("h1");
  h1City.innerHTML = city.value;
  let apiKey = "fe4080aao899e9f0t02b715782f60cc3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city.value}&units=metric&key=${apiKey}`;

  axios.get(apiUrl).then(showSearchTemperature);
}

let form = document.querySelector("form");
form.addEventListener("submit", changeCity);

function changeToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureDisplay = document.querySelector("#temperature");
  temperatureDisplay.innerHTML = Math.round(celsiusTemperature);
}

function changeToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureDisplay = document.querySelector("#temperature");
  temperatureDisplay.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changeToCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", changeToFahrenheit);

let celsiusTemperature = null;

function showCurrentTemperature(response) {
  console.log(response.data);
  let h1 = document.querySelector("h1");
  let cityName = response.data.city;
  h1.innerHTML = `${cityName}`;

  let description = response.data.condition.description;
  let h2Description = document.querySelector("#description");
  let dateElement = document.querySelector("#date-and-time");
  let iconElement = document.querySelector("#icon");
  h2Description.innerHTML = description;
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute("src", `${response.data.condition.icon_url}`);

  celsiusTemperature = response.data.temperature.current;

  let temperature = Math.round(celsiusTemperature);
  let h3 = document.querySelector("#temperature");
  h3.innerHTML = `${temperature}`;

  let precipitation = 0;
  let humidity = response.data.temperature.humidity;
  let wind = Math.round(response.data.wind.speed);
  let UV = 5;

  //let sunrise = response.data.sys.sunrise * 1000;
  //let sunset = response.data.sys.sunset * 1000;
  //let sunriseDate = new Date(sunrise);
  //let sunriseHours = sunriseDate.getHours();
  //let sunriseMinutes = sunriseDate.getMinutes();
  //let sunsetDate = new Date(sunset);
  //let sunsetHours = sunsetDate.getHours();
  //let sunsetMinutes = sunsetDate.getMinutes();

  //if (sunriseHours < 10) {
  //  sunriseHours = "0" + sunriseHours;
  //}
  //if (sunriseMinutes < 10) {
  // sunriseMinutes = "0" + sunriseMinutes;
  //}
  //if (sunsetHours < 10) {
  //sunsetHours = "0" + sunsetHours;
  //}
  //if (sunsetMinutes < 10) {
  // sunsetMinutes = "0" + sunsetMinutes;
  //}

  let h3Details = document.querySelector("#h3-details");
  h3Details.innerHTML = `Precipitation ${precipitation}%<br> Humidity ${humidity}%<br> Wind ${wind}km/h`;
  let h3Details2 = document.querySelector("#h3-details2");
  h3Details2.innerHTML = `UV ${UV}<br> Sunrise 00:00<br> Sunset 00:00`;
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
  let apiKey = "fe4080aao899e9f0t02b715782f60cc3";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${latitude}
&lon=${longitude}&units=metric&key=${apiKey}`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast-container");

  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
        <div class="col-md-2" id="1">
          <p>
            Monday
            <br />
            <span class="material-symbols-rounded light_mode">
              light_mode
            </span>
            <br />
            13° ⎹ 20°
            <br /><span class="material-symbols-rounded toggle_off">
              toggle_off
            </span>
          </p>
        </div>
  `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

displayForecast();
