import { createContext } from "react";

export const WeatherContext = createContext({
  cityName: "",
  setCityName: () => {}
});
