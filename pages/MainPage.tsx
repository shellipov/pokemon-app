import React, { useRef, useEffect } from "react";
import { Animated, StyleSheet } from "react-native";
import { Container, Button, OrangText } from "@/src/StyledComponents";
import { fadeIn } from '@/utils/fade'
import {useNavigation} from '@react-navigation/native';
import SoundController from "@/utils/sounds";


const MainPage = () => {
  const navigation =  useNavigation()
  const button1 = useRef(new Animated.Value(0)).current;
  const button2 = useRef(new Animated.Value(0)).current;
  const button3 = useRef(new Animated.Value(0)).current;
  const button4 = useRef(new Animated.Value(0)).current;
  const click = SoundController.instance.playClick

  useEffect(() => {
    fadeIn(button1, 150);
    fadeIn(button2, 300);
    fadeIn(button3, 450);
    fadeIn(button4, 600);
  }, []);

  return (
    <Container style={{ paddingVertical: '20%' }}>
      <Animated.View style={[{ opacity: button1 }, styles.buttonBlock]}>
        <Button
          onPress={() => {
              navigation.navigate("Game");
              click()

          }}
        >
          <OrangText>{'Game'}</OrangText>
        </Button>
      </Animated.View>

      <Animated.View style={[{ opacity: button2 }, styles.buttonBlock]}>
        <Button
          onPress={() => {
              navigation.navigate("PokemonList");
              click()
          }}
        >
          <OrangText>{'Pokemons'}</OrangText>
        </Button>
      </Animated.View>

      <Animated.View style={[{ opacity: button3 }, styles.buttonBlock]}>
        <Button
          onPress={() => {
              navigation.navigate("Favorites");
              click()
          }}>
          <OrangText>
              {'Favorites'}
          </OrangText>
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
