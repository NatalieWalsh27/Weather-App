function initialise() {
  let city = "Melbourne";
  let apiKey = "fe4080aao899e9f0t02b715782f60cc3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Melbourne&units=metric&key=${apiKey}`;

  axios.get(apiUrl).then(showCurrentTemperature);
}

initialise();

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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-a-city");
  let h1City = document.querySelector("h1");
  h1City.innerHTML = city.value;
  let apiKey = "fe4080aao899e9f0t02b715782f60cc3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city.value}&units=metric&key=${apiKey}`;

  axios.get(apiUrl).then(showCurrentTemperature);
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

function getForecast(coordinates) {
  let apiKey = "fe4080aao899e9f0t02b715782f60cc3";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&units=metric&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);

  var myHeaders = new Headers();
  myHeaders.append("x-access-token", "openuv-647uzhrlkmfxeti-io");
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `https://api.openuv.io/api/v1/uv?lat=${coordinates.latitude}&lng=${coordinates.longitude}`,
    requestOptions
  )
    .then((response) => response.json())
    .then(UV);
}

function showCurrentTemperature(response) {
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

  let h3Details = document.querySelector("#h3-details");
  h3Details.innerHTML = `Precipitation &nbsp; ${precipitation}%<br> Humidity &nbsp; ${humidity}%<br> Wind &nbsp; ${wind}km/h`;

  if (temperature > 24) {
    document.body.style.backgroundImage = "url('style/images/flowers.jpg')";
    let imageCredit = document.querySelector(".image-credit");
    imageCredit.innerHTML = `Image by <a href="https://www.freepik.com/free-vector/gradient-flower-field-background_49160444.htm#page=2&query=landscape&position=45&from_view=search&track=sph" id ="freepik-link" target="_blank">Freepik</a>`;
  }
  if (temperature >= 17 && temperature <= 24) {
    document.body.style.backgroundImage = "url('style/images/lighthouse.jpg')";
    let imageCredit = document.querySelector(".image-credit");
    imageCredit.innerHTML = `Image by <a href="https://www.freepik.com/free-vector/lighthouse-early-morning-sea-shore-beacon_21584911.htm#query=landscape&position=46&from_view=search&track=sph" id ="freepik-link" target="_blank">Freepik</a>`;
  }
  if (temperature < 17 && temperature >= 10) {
    document.body.style.backgroundImage = "url('style/images/Scene-24.jpg')";
    let imageCredit = document.querySelector(".image-credit");
    imageCredit.innerHTML = `Image by <a href="https://www.freepik.com/free-vector/nature-scene-with-river-hills-forest-mountain-landscape-flat-cartoon-style-illustration_12953559.htm#query=landscape&position=0&from_view=search&track=sph" id ="freepik-link" target="_blank">Freepik</a>`;
  }

  if (temperature < 10) {
    document.body.style.backgroundImage = "url('style/images/snow.jpg')";
    let imageCredit = document.querySelector(".image-credit");
    imageCredit.innerHTML = `Image by <a href="https://www.freepik.com/free-vector/winter-mountains-northern-nature-rocky-landscape_20700538.htm#page=2&query=cold%20landscape&position=3&from_view=search&track=ais" id ="freepik-link" target="_blank">Freepik</a>`;
  }

  getForecast(response.data.coordinates);
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

function displayForecast(response) {
  let forecast = response.data.daily;
  forecast.shift();
  let forecastElement = document.querySelector("#forecast-container");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
            <img src='${forecastDay.condition.icon_url}'/>

            <div class="weather-forecast-temperature"><span class="weather-forecast-temperature-max">
            ${Math.round(
              forecastDay.temperature.maximum
            )}° &nbsp;</span> ⎹  <span class="weather-forecast-temperature-min">&nbsp; ${Math.round(
          forecastDay.temperature.minimum
        )}°
        </div>
        </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function extraDetails(response) {
  console.log(response.data);
  let sunrise = response.data.sys.sunrise * 1000;
  let sunriseDate = new Date(sunrise);
  let sunriseHours = sunriseDate.getHours();
  if (sunriseHours < 10) {
    sunriseHours = "0" + sunriseHours;
  }
  let sunriseMinutes = sunriseDate.getMinutes();
  if (sunriseMinutes < 10) {
    sunriseMinutes = "0" + sunriseMinutes;
  }
  let sunriseElement = document.querySelector("#sunrise");
  sunriseElement.innerHTML = `${sunriseHours}:${sunriseMinutes}`;

  let sunset = response.data.sys.sunset * 1000;
  let sunsetDate = new Date(sunset);
  let sunsetHours = sunsetDate.getHours();
  if (sunsetHours < 10) {
    sunsetHours = "0" + sunsetHours;
  }
  let sunsetMinutes = sunsetDate.getMinutes();
  if (sunsetMinutes < 10) {
    sunsetMinutes = "0" + sunsetMinutes;
  }
  let sunsetElement = document.querySelector("#sunset");
  sunsetElement.innerHTML = `${sunsetHours}:${sunsetMinutes}`;
}

function UV(response) {
  let uvMax = Math.round(response.result.uv_max);
  let uvElement = document.querySelector("#UV");
  uvElement.innerHTML = uvMax;
}

displayForecast();
