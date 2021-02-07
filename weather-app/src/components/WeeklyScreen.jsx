import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, ImageBackground, Text } from "react-native";
import { forecastFor7days } from "../services/index";
import { WeatherContext } from "../context/weatherContext";
import { LatLonContext } from "../context/latLonContext";
import { Header } from "./Header";
import { List } from "./List";

export const WeeklyScreen = () => {
  const { cityName, setCityName } = useContext(WeatherContext);
  const { lat, lon } = useContext(LatLonContext);

  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const data = await forecastFor7days(lat, lon);
      setWeatherData(data);
      setError("");
    } catch (err) {
      setError("Please type a valid city name");
      setWeatherData(null);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [lat, lon, cityName]);

  const today = new Date();
  const day = today.toLocaleString("en-us", { weekday: "long" });
  const month = today.toLocaleString("en-us", { month: "long" });
  const date = today.getUTCDate();

  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require("../../assets/bg.jpg")}
    >
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
        ) : (
          weatherData && weatherData.daily && <List data={weatherData.daily} />
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  view: {
    alignItems: "flex-start",
    backgroundColor: "rgba(100, 162, 216, 0.9)",
    color: "#fff",
    flex: 1,
    height: "100%",
    justifyContent: "flex-start",
    paddingTop: 60,
    width: "100%"
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover"
  },
  font: {
    color: "#fff",
    fontFamily: "Helvetica Neue",
    fontWeight: "200"
  },
  textError: {
    fontSize: 26,
    marginTop: 20,
    opacity: 0.8,
    textAlign: "center",
    width: "100%"
  }
});
