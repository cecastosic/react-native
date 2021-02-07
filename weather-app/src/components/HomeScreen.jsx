import React, { useState, useEffect, useContext } from "react";
import { useDebounce } from "use-debounce";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getWeatherByCityName, getWeatherByLatLon } from "../services/index";
import { WeatherContext } from "../context/weatherContext";
import { LatLonContext } from "../context/latLonContext";
import { WeatherToday } from "./WeatherToday";
import { Header } from "./Header";

export const HomeScreen = () => {
  const { cityName, setCityName } = useContext(WeatherContext);
  const { setLat, setLon } = useContext(LatLonContext);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [debouncedCityValue] = useDebounce(cityName, 1000);

  const fetchData = async () => {
    try {
      const data = await getWeatherByCityName(debouncedCityValue);
      setWeatherData(data);
      setLat(data.coord.lat);
      setLon(data.coord.lon);
      setError("");
    } catch (err) {
      setError("Please type a valid city name");
      setWeatherData(null);
      setLat(null);
      setLon(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, [debouncedCityValue]);

  const today = new Date();
  const day = today.toLocaleString("en-us", { weekday: "long" });
  const month = today.toLocaleString("en-us", { month: "long" });
  const date = today.getUTCDate();

  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require("../../assets/bg.jpg")}
    >
      {/* <LinearGradient
        colors={["#1E5D96", "#64A2D8", "#9FCCF2"]}
        style={styles.view}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
      > */}
      <View style={styles.view}>
        <Header
          day={day}
          month={month}
          date={date}
          cityName={cityName}
          setCityName={setCityName}
        />
        {error !== "" ? (
          <Text style={[styles.textError, styles.font]}>{error}</Text>
        ) : !weatherData ? (
          <Text style={[styles.textError, styles.font]}>Loading</Text>
        ) : (
          <WeatherToday weatherData={weatherData} />
        )}
      </View>
      {/* </LinearGradient> */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover"
  },
  font: {
    color: "#fff",
    fontFamily: "Helvetica Neue",
    fontWeight: "200"
  },
  view: {
    alignItems: "flex-start",
    backgroundColor: "rgba(100, 162, 216, 0.9)",
    color: "#fff",
    flex: 1,
    height: "100%",
    justifyContent: "flex-start",
    paddingTop: 60,
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
    width: "100%"
  },
  textError: {
    fontSize: 26,
    marginTop: 20,
    opacity: 0.8,
    textAlign: "center",
    width: "100%"
  }
});
