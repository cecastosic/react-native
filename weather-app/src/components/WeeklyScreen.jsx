import React, { useState, useEffect } from "react";
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

export const WeeklyScreen = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [lat, setLat] = useState(55.6759);
  const [lon, setLon] = useState(12.5655);
  //const [debouncedCityValue] = useDebounce(cityName, 1000);
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
              <Text style={[styles.textHeader, styles.font]}>Copenhagen</Text>
            </View>
            {weatherData.daily &&
              weatherData.daily.map((day, index) => {
                return (
                  <View style={styles.viewBottomInside} key={index}>
                    <Image
                      style={styles.icon}
                      source={{
                        uri: `http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png`
                      }}
                    />
                    <View>
                      <Text style={styles.textBottom}>
                        {day.weather[0].main}
                      </Text>
                      <Text style={styles.textStrong}>
                        {Math.ceil(day.temp.day)}
                        °C
                      </Text>
                    </View>
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
    alignItems: "center",
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
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 10
  },
  textBottom: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "200"
  },
  textStrong: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "300"
  },
  icon: {
    height: 50,
    marginRight: 5,
    width: 50
  }
});
