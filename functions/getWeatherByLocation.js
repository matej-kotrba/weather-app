const path = require("path");
const axios = require("axios");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

exports.handler = async function (event, context) {
  const name = event.queryStringParameters.name;

  let cityObject = {
    cityName: "",
    description: "",
    tempature: 0,
    icon: "",
    weather: "",
    time: undefined,
    wind: 0,
    deg: 0,
    rain: 0,
  };

  try {
    // let data = await axios.get(
    //   `https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=${process.env.API_KEY}`
    // );

    // let cityData = await axios.get(
    //   `https://api.openweathermap.org/data/2.5/weather?lat=${data.data[0].lat}&lon=${data.data[0].lon}&appid=${process.env.API_KEY}&units=metric`
    // );

    let cityData = await axios.get(
      `
      https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${process.env.API_KEY}&units=metric
      `
    );

    // console.log(cityData.data);

    cityObject.cityName = cityData.data.name;
    cityObject.description = cityData.data.weather[0].description;
    if (
      +cityData.data.weather[0].id >= 701 &&
      +cityData.data.weather[0].id <= 781
    ) {
      cityObject.main = "Fog";
    } else {
      cityObject.main = cityData.data.weather[0].main;
    }
    cityObject.icon = cityData.data.weather[0].icon;
    cityObject.tempature = cityData.data.main.temp;
    cityObject.speed = cityData.data.wind.speed;
    cityObject.deg = cityData.data.wind.deg;
    cityObject.rain = cityData.data.rain ? cityData.data.rain["1h"] : 0;
    cityObject.humidity = cityData.data.main.humidity;

    let pom = new Date();
    let pomOffset = pom.getTimezoneOffset();

    cityObject.time = new Date(
      pom.getTime() - pomOffset * 60 + cityData.data.timezone * 1000
    );

    let hours = cityObject.time.getUTCHours();
    let min = cityObject.time.getUTCMinutes();

    cityObject.time = `${hours < 10 ? "0" + hours : hours}:${
      min < 10 ? "0" + min : min
    }`;
  } catch (err) {
    console.log("ERROR !!!!!!!!!");
  }

  // console.log(cityObject);

  return {
    statusCode: 200,
    body: JSON.stringify(cityObject),
  };
};
