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
  let temperature = Math.round(response.data.main.temp);

  weathe.innerHTML = `${temperature}`;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchEngine");

  let city = document.querySelector("#place");
  let cityValue = `${searchInput.value}`;
  city.innerHTML = searchInput.value;
  let apiKey = "13a483e025bc252004749ec865591b38";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

let form = document.querySelector("#form");
form.addEventListener("submit", search);
