import React, { useRef, useEffect } from "react";
import { Animated, StyleSheet } from "react-native";
import { Container, Button, OrangText } from "@/src/StyledComponents";
import { fadeIn } from '@/utils/fade'
import { useRouter } from 'expo-router';
import SoundController from "@/utils/sounds.ts";


const Index = () => {
  const router = useRouter();
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
              router.navigate("/game");
              click()

          }}
        >
          <OrangText>{'Game'}</OrangText>
        </Button>
      </Animated.View>

      <Animated.View style={[{ opacity: button2 }, styles.buttonBlock]}>
        <Button
          onPress={() => {
              router.navigate("/pokemonList");
              click()
          }}
        >
          <OrangText>{'Pokemons'}</OrangText>
        </Button>
      </Animated.View>

      <Animated.View style={[{ opacity: button3 }, styles.buttonBlock]}>
        <Button
          onPress={() => {
              router.navigate("/favorites");
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

export default Index;

const styles = StyleSheet.create({
  buttonBlock: {
    width: "100%",
    alignItems: "center",
  },
});
