

    let now = new Date();

    let h2 = document.querySelector("#dateAndTime");
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

    const apiKey = "WnRkOTPycCoRCeCJYDdYMwmR2zF8aPFC";

    let month = months[now.getMonth()];
    h2.innerHTML = `${day}, ${date} ${month} ${year}, ${hour}:${minute}`;

let form = document.querySelector("#search-city");
form.addEventListener("submit", searchCity);
    
//Search Engine 

function searchCity(event) {
  event.preventDefault();

  let chosenCity = document.querySelector("#chosen-city");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${chosenCity.value}`.toUpperCase();
  console.log(`chosenCity is ${chosenCity}`);


  let locationApiUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${chosenCity.value}`;
  console.log(`locationApiUrl is ${locationApiUrl}`);
  console.log(axios.get(`${locationApiUrl}`));
  axios.get(`${locationApiUrl}`).then(getWeather);
}




function getWeather(cityObject) {
  console.log(`locationCity Key is ${cityObject.data[0].Key}`);
  let locationKey = cityObject.data[0].Key;

  let weatherDetailsUrl = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?details=true&apikey=${apiKey}`;
  console.log(`weatherDetailsUrl is ${weatherDetailsUrl}`);

  axios.get(`${weatherDetailsUrl}`).then(showWeather);
}



function showWeather(currentWeatherConditions)
{
  console.log(currentWeatherConditions);

  let temperature = Math.round(
    currentWeatherConditions.data[0].ApparentTemperature.Metric.Value
  );
  console.log(`${temperature}`);


  let humid = document.querySelector("#humidity");
  let currentHumidity = currentWeatherConditions.data[0].RelativeHumidity;
  humid.innerHTML = `Humidity : ${currentHumidity} %`;

  let wind = document.querySelector("#windSpeed");
  let currentWindSpeed =
    currentWeatherConditions.data[0].Wind.Speed.Metric.Value;
  wind.innerHTML = `Wind: ${currentWindSpeed} km/h`;

  let h3 = document.querySelector("h3");
  let description = currentWeatherConditions.data[0].WeatherText;
  h3.innerHTML = `${description}`;

  let celciusTemp = document.querySelector("#showTemp");
  let tempMetric = currentWeatherConditions.data[0].Temperature.Metric.Value;
  celciusTemp.innerHTML = `${tempMetric}`;

  /*

  let fahrenheitTemp = document.querySelector("#fahrenheit");
  let tempImperial =
    currentWeatherConditions.data[0].Temperature.Imperial.Value;
  fahrenheitTemp.innerHTML = `${tempImperial}`;
  
  //TO DO : Upon click

  let iconElement = document.querySelector("#icon-top");

  /* TO DO : Update picture */
  /*TO DO: Put Humidity*/
}




//updateDateTime(); 
