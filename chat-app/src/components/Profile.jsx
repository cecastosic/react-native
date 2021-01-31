import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

export const Profile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textcontainer}>
        <Text style={styles.text}>Profile </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  textcontainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100
  },
  text: {
    color: "black",
    fontSize: 25,
    fontWeight: "bold",
    padding: 7
  }
});
