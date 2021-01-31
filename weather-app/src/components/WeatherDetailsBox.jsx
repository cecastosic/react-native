import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export const WeatherDetails = ({ icon, text, value, unit, iconStyle }) => {
  const imageUri = img => Image.resolveAssetSource(img).uri;

  return (
    <View style={styles.viewBottomInside}>
      <Image style={iconStyle} source={{ uri: imageUri(icon) }} />
      <View>
        <Text style={styles.textBottom}>{text}</Text>
        <Text style={styles.textStrong}>
          {Math.ceil(value)}
          {unit}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewBottomInside: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 10
  },
  textBottom: {
    color: "#fff",
    fontWeight: "200"
  },
  textStrong: {
    color: "#fff",
    fontWeight: "300"
  }
});
