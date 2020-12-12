let now = new Date();

let h2 = document.querySelector("h2");
let year = now.getFullYear();
let date = now.getDate();
let hour = now.getHours();

if (hour < 10) {
  hour = `0${hour}`;
}

let minute = now.getMinutes();

if (minute < 10) {
  minute = `0${minute}`;
}

let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

month = months[now.getMonth()];
h2.innerHTML = `${day}, ${date} ${month} ${year}, ${hour}:${minute}`;

//Search Engine

function searchCity(event) {
  event.preventDefault();

  let chosenCity = document.querySelector("#chosen-city");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${chosenCity.value}`.toUpperCase();
  let apiKey = "39a7ee9df8b34ac078f7a18503bcb052";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${chosenCity.value}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(showWeather);
}

let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);

  let humid = document.querySelector("#humidity");
  let currentHumidity = response.data.main.humidity;
  humid.innerHTML = `Humidity : ${currentHumidity} %`;

  let wind = document.querySelector("#windSpeed");
  let currentWindSpeed = response.data.wind.speed;
  wind.innerHTML = `Wind: ${currentWindSpeed} km/h`;

  let h3 = document.querySelector("h3");
  let description = response.data.weather[0].main;
  h3.innerHTML = `${description}`;

  let city = response.data.name;

  let htmlTemp = document.querySelector("#showTemp");
  htmlTemp.innerHTML = `${temperature}`;
}
