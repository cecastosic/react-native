import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const data = [
  {
    name: "John",
    message: "Hello"
  },
  {
    name: "Sara",
    message: "How are you?"
  },
  {
    name: "Cecilie",
    message: "Hey let's drink coffee"
  }
];
export const Chat = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.title}>{item.message}</Text>
          </View>
        )}
        keyExtractor={item => item.name}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 32
  }
});
