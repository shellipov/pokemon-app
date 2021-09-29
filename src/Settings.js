import React from "react";
import { mainStyles } from "../styles/styles";

import { Text, View, Switch } from "react-native";

export default function Settings({ isBlacktheme, setIsBlacktheme }) {
  const toggleSwitch = () => setIsBlacktheme((previousState) => !previousState);
  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: isBlacktheme? 'rgb(24, 24, 24)': 'white'
        }}
      >
        <View
          style={{
            backgroundColor: "gray",
            paddingHorizontal: 50,
            paddingVertical: 50,
            borderRadius: 20,
            shadowColor: "gray",
            shadowOffset: {
              width: 2,
              height: 2,
            },
            shadowOpacity: 1,
            shadowRadius: 1,
            elevation: 1,
            borderColor: "black",
            borderWidth: 1,
          }}
        >
          <Text style={[mainStyles.comixWhite, { marginBottom: 20 }]}>
            {" "}
            Take a dark theme
          </Text>
          <Switch
            trackColor={{ false: "black", true: "black" }}
            thumbColor={isBlacktheme ? "orange" : "white"}
            ios_backgroundColor="black"
            onValueChange={toggleSwitch}
            value={isBlacktheme}
          />
        </View>
      </View>
    </>
  );
}
