function formatDate() {
  let today = new Date();
  let todayDay = today.getDate();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[today.getDay()];

  let month = [
    "January",
    "February",
    "Marz",
    "April",
    "May",
    "Juni",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let moonth = month[today.getMonth()];

  let hours = today.getHours();
  let minutes = today.getMinutes();

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  let formattedDate = `${day}, ${moonth} ${todayDay}, ${hours}:${minutes}`;

  return formattedDate;
}

let changingDate = document.querySelector("#date");
changingDate.innerHTML = formatDate(new Date());

function displayWeather(response) {
  let weathe = document.querySelector("#temp-change");
  let cityElement =  document.querySelector("#place");
  let descriptionElement = document.querySelector("#description");
  let humidityElement =  document.querySelector("#humidity");
  let windElement =  document.querySelector("#wind");
  let iconElement =  document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;
  let temperatureElement = Math.round(response.data.main.temp);
  weathe.innerHTML = `${temperatureElement}`;
  cityElement.innerHTML = response.data.name;
   descriptionElement.innerHTML = response.data.weather[0].description;
   humidityElement.innerHTML = response.data.main.humidity;
   windElement.innerHTML = Math.round(response.data.wind.speed);
   iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
   iconElement.setAttribute("alt", response.data.weather[0].description);
}


function search(city) {
  let apiKey = "13a483e025bc252004749ec865591b38";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
event.preventDefault();
let searchInput = document.querySelector("#searchEngine");
search(searchInput.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-change");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

let celsiusTemperature = null;

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temp-change");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}


let form = document.querySelector("#form");
form.addEventListener("submit", handleSubmit);


let fahrenheitLink = document.querySelector("#far-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#cel-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search ("Kyiv");
