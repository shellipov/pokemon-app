import React, { useRef, useEffect } from "react";
import { Animated, StyleSheet } from "react-native";
import { Container, Button, OrangText } from "../src/StyledComponents";
import { fadeIn } from '../utils/fade'

const MainPage = ({ isBlacktheme, navigation, playClick }) => {
  const button1 = useRef(new Animated.Value(0)).current;
  const button2 = useRef(new Animated.Value(0)).current;
  const button3 = useRef(new Animated.Value(0)).current;
  const button4 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeIn(button1, 150);
    fadeIn(button2, 300);
    fadeIn(button3, 450);
    fadeIn(button4, 600);
  }, []);

  return (
    <Container style={{ paddingVertical: '20%' }} isBlacktheme={isBlacktheme}>
      <Animated.View style={[{ opacity: button1 }, styles.buttonBlock]}>
        <Button
          onPress={() => {
            navigation.navigate("Game"), playClick();
          }}
        >
          <OrangText>Game</OrangText>
        </Button>
      </Animated.View>

      <Animated.View style={[{ opacity: button2 }, styles.buttonBlock]}>
        <Button
          onPress={() => {
            navigation.navigate("Pokemons"), playClick();
          }}
        >
          <OrangText>Pokemons</OrangText>
        </Button>
      </Animated.View>

      <Animated.View style={[{ opacity: button3 }, styles.buttonBlock]}>
        <Button
          onPress={() => {
            navigation.navigate("Favorites"), playClick();
          }}
        >
          <OrangText>Favorites</OrangText>
        </Button>
      </Animated.View>

      <Animated.View style={[{ opacity: button4 }, styles.buttonBlock]}>
        <Button
          onPress={() => {
            navigation.navigate("Settings"), playClick();
          }}
        >
          <OrangText>Settings</OrangText>
        </Button>
      </Animated.View>
    </Container>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  buttonBlock: {
    width: "100%",
    alignItems: "center",
  },
});
