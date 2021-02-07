import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "./src/components/HomeScreen";
import { WeeklyScreen } from "./src/components/WeeklyScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { WeatherContext } from "./src/context/weatherContext";
import { LatLonContext } from "./src/context/latLonContext";
import useGeolocation from "react-hook-geolocation";
import { getWeatherByLatLon } from "./src/services/index";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from "@react-navigation/drawer";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem label="Weather for:" />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const DrawerNavigator = ({ cityName, setCityName }) => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      //drawerType="slide"
      drawerContentOptions={{
        activeTintColor: "#fff",
        inactiveTintColor: "#0E2A52",
        activeBackgroundColor: "#0E2A52"
      }}
      drawerStyle={{
        backgroundColor: "rgba(100, 162, 216, 0.8)"
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name={cityName} component={BottomTabNavigator} />
    </Drawer.Navigator>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        inactiveTintColor: "#0E2A52",
        activeTintColor: "#fff",
        labelStyle: { fontSize: 12 },
        inactiveBackgroundColor: "#1B78C5",
        activeBackgroundColor: "#0E2A52",
        style: { borderTopWidth: 0 }
      }}
    >
      <Tab.Screen
        name="Today"
        component={HomeScreen}
        options={{
          tabBarLabel: "Today",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="calendar-today"
              color={color}
              size={size}
            />
          )
        }}
      />
      <Tab.Screen
        name="Weekly"
        component={WeeklyScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="calendar-week"
              color={color}
              size={size}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const geolocation = useGeolocation();
  const [cityName, setCityName] = useState("");
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [debouncedCityValue] = useDebounce(cityName, 1000);

  const fetchData = async (lat, lon) => {
    try {
      const data = await getWeatherByLatLon(lat, lon);
      setCityName(data.name);
    } catch (err) {
      setLat(null);
      setLon(null);
      console.log(err);
    }
  };

  useEffect(() => {
    if (geolocation.latitude && geolocation.longitude) {
      try {
        const { latitude, longitude } = geolocation;
        setLat(latitude);
        setLon(longitude);
        fetchData(latitude, longitude);
      } catch (err) {
        console.log(err);
      }
    } else {
      setCityName("Copenhagen");
    }
  }, [geolocation]);

  return (
    <NavigationContainer>
      <WeatherContext.Provider
        value={{
          cityName,
          setCityName
        }}
      >
        <LatLonContext.Provider value={{ lat, lon, setLat, setLon }}>
          <DrawerNavigator
            cityName={
              debouncedCityValue !== "" ? debouncedCityValue : "Copenhagen"
            }
          />
        </LatLonContext.Provider>
      </WeatherContext.Provider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});
export default App;
