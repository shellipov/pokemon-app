import React from "react";
import { Switch } from "react-native";
import { Container, GrayBackground, WhiteText } from "../src/StyledComponents";

export default function Settings({ isBlacktheme, setIsBlacktheme }) {
  const toggleSwitch = () => setIsBlacktheme(!isBlacktheme);
  return (
    <>
      <Container isBlacktheme={isBlacktheme}>
        <GrayBackground>
          <WhiteText isBlacktheme={isBlacktheme} style={{ marginBottom: 20 }}>Take a dark theme</WhiteText>
          <Switch
            trackColor={{ false: "black", true: "black" }}
            thumbColor={isBlacktheme ? "orange" : "white"}
            ios_backgroundColor="black"
            onValueChange={toggleSwitch}
            value={isBlacktheme}
          />
        </GrayBackground>
      </Container>
    </>
  );
}
