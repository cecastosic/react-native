import React, { useState, useEffect, useContext } from "react";
import { useDebounce } from "use-debounce";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  FlatList
} from "react-native";
import { forecastFor7days } from "../services/index";
import { WeatherContext } from "../context/weatherContext";
import { LatLonContext } from "../context/latLonContext";

export const WeeklyScreen = () => {
  const { cityName } = useContext(WeatherContext);
  const { lat, lon } = useContext(LatLonContext);

  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const data = await forecastFor7days(lat, lon);
      setWeatherData(data);
      setError("");
    } catch (error) {
      setError("Not valid city name");
      setWeatherData(null);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [lat, lon]);

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
        {weatherData && (
          <>
            <View style={styles.viewHeader}>
              <Text style={[styles.textHeaderSoft, styles.font]}>
                {day}, {month} {date}
              </Text>
              <Text style={[styles.textHeader, styles.font]}>{cityName}</Text>
            </View>
            {weatherData.daily &&
              weatherData.daily.map((day, index) => {
                return (
                  <View style={styles.viewBottomInside} key={index}>
                    <Text style={styles.textDate}>
                      {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                        weekday: "long"
                      })}
                    </Text>
                    <Image
                      style={styles.icon}
                      source={{
                        uri: `http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png`
                      }}
                    />
                    <Text style={styles.textStrong}>{day.weather[0].main}</Text>
                    <Text style={styles.textBottom}>
                      {Math.ceil(day.temp.min)}
                      °C
                    </Text>
                    <Text style={styles.textBottom}>
                      {Math.ceil(day.temp.max)}
                      °C
                    </Text>
                  </View>
                );
              })}
          </>
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
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
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
  viewHeader: {
    alignItems: "center",
    color: "#fff",
    justifyContent: "center",
    width: "100%"
  },
  textHeader: {
    fontSize: 26,
    padding: 2
  },
  textHeaderSoft: {
    opacity: 0.8
  },
  textHeaderCentered: {
    fontSize: 20,
    padding: 2
  },
  viewBottomInside: {
    alignItems: "center",
    backgroundColor: "rgba(256, 256, 256, 0.15)",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 10
  },
  textBottom: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "200",
    marginLeft: 20,
    width: 50
  },
  textDate: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "200",
    marginLeft: 10,
    textAlign: "right",
    width: 100
  },
  textStrong: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "300",
    marginRight: 20
  },
  icon: {
    height: 50,
    marginRight: 5,
    width: 50
  }
});
