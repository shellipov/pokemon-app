import * as Font from "expo-font";
import { StyleSheet } from "react-native";

export const fonts = () =>
  Font.loadAsync({
    comix: require("../fonts/comixloucyr.ttf"),
    manropebold: require("../fonts/Manropebold.ttf"),
    manropelight: require("../fonts/Manropelight.ttf"),
  });

export const mainStyles = StyleSheet.create({
  titleFont: {
    fontFamily: "comix",
    fontSize: 30,
    color: "orange",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 3,
    padding: 5
  },
  link: {
    fontFamily: "comix",
    fontSize: 15,
    color: "red",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
    padding: 3
  },
});
