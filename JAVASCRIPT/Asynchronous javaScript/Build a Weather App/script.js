const weatherInfo = "https://weather-proxy.freecodecamp.rocks/api/city/<CITY>";
const selectCity = document.querySelector("select");
const weatherIcon = document.getElementById("weather-icon");
const mainTemperature = document.getElementById("main-temperature");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const windGust = document.getElementById("wind-gust");
const weatherMain = document.getElementById("weather-main");
const getForecast = document.getElementById("get-forecast");
const loc = document.getElementById("location");
const windIcon = document.querySelector('svg');

const getWeather = async city => {
  const cityWeather = weatherInfo.replace("<CITY>", city);

  try {
    const res = await fetch(cityWeather);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const showWeather = async city => {
  try {
    const data = await getWeather(city);
    const { weather, main, visibility, wind: windObj, name } = data;
    const [{ main: weathMain, description, icon }] = weather;
    const {
      temp,
      feels_like,
      temp_min,
      temp_max,
      pressure,
      humidity: humidityValue,
    } = main;
    const { speed, deg, gust } = windObj;
    windIcon.style.visibility = 'visible'
    weatherIcon.setAttribute("src", icon);
    loc.textContent = name;
    mainTemperature.innerHTML = `<p>Temperature ${temp ?? "- N/A -"}°C </p>`;
    feelsLike.innerHTML = `<p>Preceived ${feels_like ?? "- N/A -"}°C </p>`;
    humidity.innerHTML = `<p>Humidity ${humidityValue ?? "- N/A -"}%</p>`;
    wind.innerHTML = `<p>Wind speed ${speed ?? "- N/A -"}m/s</p>`;
    windGust.innerHTML = `<p>Wind gusts ${gust ?? "- N/A -"}m/s</p>`;
    weatherMain.innerHTML = `<p>${weathMain ?? "- N/A -"}</p>`;
  } catch (err) {
    alert("Something went wrong, please try again later");
  }
};

getForecast.addEventListener("click", () => {
  const city = selectCity.value;
  showWeather(city);
});
