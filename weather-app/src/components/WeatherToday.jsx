import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { FeelsLike, Humidity, Pressure, Wind } from "../images";
import { WeatherDetails } from "./WeatherDetailsBox";

export const WeatherToday = ({ weatherData }) => {
  return (
    <>
      <View style={styles.viewCenter}>
        <Image
          style={styles.iconBig}
          source={{
            uri: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`
          }}
        />
        <Text style={[styles.textCenter, styles.font]}>
          {weatherData.weather[0].main}
        </Text>
        <Text style={styles.textCenterTemperature}>
          {Math.ceil(weatherData.main.temp)}&#8451;
        </Text>
      </View>
      <View style={styles.viewBottom}>
        <View>
          <WeatherDetails
            icon={FeelsLike}
            text="Feels like"
            value={weatherData.main.feels_like}
            unit="°C"
            iconStyle={styles.icon}
          />
          <WeatherDetails
            icon={Wind}
            text="Wind"
            value={weatherData.wind.speed}
            unit="m/s"
            iconStyle={styles.icon}
          />
        </View>
        <View>
          <WeatherDetails
            icon={Humidity}
            text="Humidity"
            value={weatherData.main.humidity}
            unit="%"
            iconStyle={styles.icon}
          />
          <WeatherDetails
            icon={Pressure}
            text="Pressure"
            value={weatherData.main.pressure}
            unit="hPa"
            iconStyle={styles.iconWider}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  font: {
    color: "#fff",
    fontFamily: "Helvetica Neue",
    fontWeight: "200"
  },
  viewCenter: {
    alignItems: "center",
    color: "#fff",
    justifyContent: "center",
    marginTop: 50,
    width: "100%"
  },
  iconBig: { width: 300, height: 160 },
  textCenter: {
    fontSize: 36
  },
  textCenterTemperature: {
    color: "#fff",
    fontSize: 48,
    fontFamily: "Helvetica Neue",
    fontWeight: "600"
  },
  viewBottom: {
    alignItems: "center",
    color: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
    paddingHorizontal: 50,
    paddingVertical: 20,
    width: "100%"
  },
  icon: {
    height: 30,
    marginRight: 5,
    width: 30
  },
  iconWider: {
    height: 30,
    marginRight: 5,
    width: 35
  }
});
