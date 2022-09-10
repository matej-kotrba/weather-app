const path = require("path");
const axios = require("axios");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

exports.handler = async function (event, context) {
  const name = event.queryStringParameters.name;

  let forecastArray = {
    lists: [],
  };

  try {
    const data = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${process.env.API_KEY}&units=metric`
    );
    const json = await data;
    forecastArray.lists = json.data.list;

    const listArray = json.data.list.map((item) => {
      let date = new Date(item.dt * 1000);
      let min = date.getUTCMinutes();
      let hours = date.getUTCHours();
      let datum = date.getUTCDate();
      let month = date.getUTCMonth() + 1;

      let timeString = `${hours < 10 ? "0" + hours : hours}:${
        min < 10 ? "0" + min : min
      }`;

      let dateString = `${datum}.${month}`;
      return {
        time: timeString,
        date: dateString,
        tem: item.main.temp,
        main: item.weather[0].main,
        rain: item.rain ? item.rain["3h"] : 0,
      };
    });

    forecastArray.lists = listArray;
  } catch (e) {
    console.log("FORECAST ERROR !");
  }

  return {
    statusCode: 200,
    body: JSON.stringify(forecastArray),
  };
};
