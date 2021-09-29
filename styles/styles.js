import * as Font from "expo-font";
import { StyleSheet } from "react-native";

export const fonts = () =>
  Font.loadAsync({
    comix: require("../fonts/comixloucyr.ttf"),
    manropebold: require("../fonts/Manropebold.ttf"),
    manropelight: require("../fonts/Manropelight.ttf"),
  });

export const mainStyles = StyleSheet.create({
  card: {
    backgroundColor: "orange",
    padding: 6,
    paddingHorizontal: 15,
    borderRadius: 16,
    margin: 5,
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    shadowColor: "gray",
    paddingLeft: 20,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 1,
  },
  titleFont: {
    fontFamily: "comix",
    fontSize: 15,
    color: "orange",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
    padding: 5,
  },
  pageButton: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 4,
    marginLeft : 12,
    borderRadius: 16,
    width:60,
    shadowColor: "gray",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 1,
    
  },
  pageButtonText: {
    fontFamily: "comix",
    fontSize: 13,
    color: "orange",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
    
  },
  link: {
    fontFamily: "comix",
    fontSize: 15,
    color: "red",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
    padding: 3,
    backgroundColor: "red",
  },
  center: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  around: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 20
  },
  comix: {
    fontFamily: "comix",
    color: "black",
    fontSize: 10,
  },
  comixWhite: {
    fontFamily: "comix",
    color: "white",
    fontSize: 10,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },
  big: {
    fontFamily: "comix",
    color: "orange",
    fontSize: 25,
    textShadowColor: "black",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },
  favotiveFont: {
    marginTop: 10,
    fontFamily: "comix",
    fontSize: 16,
    color: "orange",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 1,
  },
  delete: {
    fontFamily: "comix",
    fontSize: 12,
    color: "orange",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
    paddingLeft: 4,
    paddingRight: 3,
  },
});
