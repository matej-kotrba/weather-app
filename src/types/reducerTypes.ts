export enum reducerActions {
  CHANGE_CURRENT_LOCATION = "CHANGE_CURRENT_LOCATION",
  CHANGE_FORECAST = "CHANGE_FORECAST"
}

export interface CurrentLocationInterface {
  cityName: string;
  description: string;
  main: string;
  icon: string;
  tempature: number;
  speed: number;
  rain: number;
  deg: number;
  humidity: number;
  time: string;
}

export interface ForecastLocationInterface {
  array: Array<{
    date: string;
    time: string;
    tem: number;
    main: string;
    rain: number;
  }>
}

export interface reducerStateCurrent {
  currentLocation: CurrentLocationInterface
}

export interface reducerStateForecast {
  forecast: ForecastLocationInterface
}

export interface reducerAction {
  type: reducerActions;
  payload: reducerStateCurrent | reducerStateForecast
}