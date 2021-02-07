import React from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";

export const List = ({ data }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <View style={styles.list}>
          <Text style={styles.textDate}>
            {new Date(item.dt * 1000).toLocaleDateString("en-US", {
              weekday: "long"
            })}
          </Text>
          <Image
            style={styles.icon}
            source={{
              uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`
            }}
          />
          <Text style={styles.textStrong}>{item.weather[0].main}</Text>
          <Text style={styles.textMinMax}>
            {Math.ceil(item.temp.min)}
            °C
          </Text>
          <Text style={styles.textMinMax}>
            {Math.ceil(item.temp.max)}
            °C
          </Text>
        </View>
      )}
      keyExtractor={item => new Date(item.dt * 1000).toDateString()}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    alignItems: "center",
    backgroundColor: "rgba(256, 256, 256, 0.15)",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 10,
    paddingHorizontal: 20,
    width: "100%"
  },
  textMinMax: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "200",
    marginLeft: 10,
    paddingRight: 5
  },
  textDate: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "200",
    marginLeft: 5,
    textAlign: "left",
    width: 100
  },
  textStrong: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "300",
    marginRight: 5,
    textAlign: "left",
    width: 90
  },
  icon: {
    height: 50,
    marginRight: 5,
    width: 50
  }
});
