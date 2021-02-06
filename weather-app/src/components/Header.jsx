import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

export const Header = ({ day, month, date, cityName, setCityName }) => {
  return (
    <View style={styles.viewHeader}>
      <Text style={[styles.textHeaderSoft, styles.font]}>
        {day}, {month} {date}
      </Text>
      {/* <Text style={[styles.textHeader, styles.font]}>{cityName}</Text> */}
      <TextInput
        style={[styles.textHeader, styles.font]}
        value={cityName}
        clearButtonMode="while-editing"
        onChangeText={setCityName}
        placeholder={"Type city name"}
        autoCapitalize="words"
        textAlign="center"
        textContentType="location"
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
    minWidth: 250,
    padding: 2
  },
  textHeaderSoft: {
    opacity: 0.8
  },
  textHeaderCentered: {
    fontSize: 20,
    padding: 2
  }
});
