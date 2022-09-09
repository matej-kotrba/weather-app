import { reducerAction, reducerActions } from "../types/reducerTypes";

export const fetchDataByLocation: (
  dispatch: React.Dispatch<reducerAction>,
  value: string
) => void = async (dispatch, value) => {
  const data = await fetch(
    `/.netlify/functions/getWeatherByLocation?name=${value}`
  );
  const json = await data.json();
  console.log(json);
  dispatch({
    type: reducerActions.CHANGE_CURRENT_LOCATION,
    payload: {
      currentLocation: {
        cityName: json.cityName,
        description: json.description,
        icon: json.icon,
        tempature: json.tempature,
        main: json.main,
        rain: json.rain,
        speed: json.speed,
        deg: json.deg,
        humidity: json.humidity,
        time: json.time,
      },
    },
  });
};

export const fetchForecastByLocation: (
  dispatch: React.Dispatch<reducerAction>,
  value: string
) => void = async (dispatch, value) => {
  const data = await fetch(
    `/.netlify/functions/getForecastByLocation?name=${value}`
  );
  const json = await data.json();
  console.log(json);
  dispatch({
    type: reducerActions.CHANGE_FORECAST,
    payload: {
      forecast: {
        array: json.lists,
      },
    },
  });
};
