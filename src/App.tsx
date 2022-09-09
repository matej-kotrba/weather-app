import React, { useReducer, createContext } from "react";
import {
  reducerActions,
  reducerAction,
  reducerStateCurrent,
  reducerStateForecast,
} from "./types/reducerTypes";
import WeatherPage from "./page/weatherPage";

export const WeatherContext = createContext<{
  state: reducerStateCurrent & reducerStateForecast;
  dispatch: React.Dispatch<reducerAction>;
} | null>(null);

function reducer(
  state: reducerStateCurrent & reducerStateForecast,
  action: reducerAction
) {
  switch (action.type) {
    case reducerActions.CHANGE_CURRENT_LOCATION: {
      return { ...state, ...action.payload };
    }
    case reducerActions.CHANGE_FORECAST: {
      return { ...state, ...action.payload };
    }
    default: {
      throw new Error();
    }
  }
}

const initialState: reducerStateCurrent & reducerStateForecast = {
  currentLocation: {
    cityName: "",
    description: "",
    icon: "",
    tempature: 0,
    main: "",
    rain: 0,
    speed: 0,
    deg: 0,
    humidity: 0,
    time: "",
  },
  forecast: { array: [] },
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <WeatherContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <header className="App-header">
          <h1>
            <span>Never</span>
            <span>Weather</span>
          </h1>
        </header>
        <main>
          <WeatherPage />
        </main>
      </div>
    </WeatherContext.Provider>
  );
}

export default App;
