import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

const data = [
  {
    name: "General"
  },
  {
    name: "Random"
  },
  {
    name: "React Native"
  }
];

export const Channels = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
          </View>
        )}
        keyExtractor={item => item.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    width: "100%"
  },
  item: {
    backgroundColor: "lightblue",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  }
});
