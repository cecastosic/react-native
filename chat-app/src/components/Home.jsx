import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

export const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textcontainer}>
        <Text style={styles.text}>Welcome </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          color="black"
          title="Go to Profile"
          onPress={() => navigation.navigate("Profile")}
        />
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
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 150
  }
});
