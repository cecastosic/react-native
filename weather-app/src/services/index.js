import { API_TOKEN } from "@env";

const token = API_TOKEN;
const url = "https://api.openweathermap.org/data/2.5/weather";
const responseConf = async response => {
  if (!response.ok) {
    const message = `An error has ocurred: ${response.status}`;
    throw new Error(message);
  }

  const weather = await response.json();
  return weather;
};
export const getWeatherByCityName = async city => {
  if (!city) {
    throw new Error("You need to provide city");
  }
  const response = await fetch(`${url}?q=${city}&APPID=${token}&units=metric`);

  return responseConf(response);
};

export const getWeatherByCityID = async id => {
  if (!id) {
    throw new Error("You need to provide id");
  }
  const response = await fetch(`${url}?id=${id}&APPID=${token}`);

  return responseConf(response);
};

//example: api.openweathermap.org/data/2.5/weather?zip=94040,us&appid={API key}
export const getWeatherByZip = async (zip, country) => {
  if (!zip && !country) {
    throw new Error("You need to provide zip and country");
  }
  const response = await fetch(`${url}?zip=${zip},${country}&APPID=${token}`);

  return responseConf(response);
};

export const forecastFor7days = async (lat, lon) => {
  if (!lat && !lon) {
    throw new Error("You need to provide city");
  }
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${token}&units=metric`
  );
  return responseConf(response);
};
