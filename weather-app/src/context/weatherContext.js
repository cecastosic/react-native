import { createContext } from "react";

const WeatherContext = createContext({
  cityName: "",
  setCityName: () => {}
});

export default WeatherContext;
