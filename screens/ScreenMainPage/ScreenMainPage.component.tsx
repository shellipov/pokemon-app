import React, {useEffect, useRef} from "react";
import {Animated, StyleSheet} from "react-native";
import {Button, Container, OrangText} from "@/src/StyledComponents";
import {fadeInFadeOutUtil} from '@/utils/fade'
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {SoundController} from "@/utils/sounds";
import {useRefAnimated} from "@/hooks/useRefAnimated";


export const ScreenMainPage = (props: unknown) => {
  const navigation =  useNavigation()
  const click = SoundController.instance.playClick
  const isFocused = useIsFocused();

  const gameButton = useRefAnimated();
  const pokemonListButton = useRefAnimated();
  const favoritesButton = useRefAnimated();

  useEffect(() => {
      const buttons = [gameButton, pokemonListButton, favoritesButton]
      fadeInFadeOutUtil({items: buttons, isActive: isFocused})
  }, [isFocused]);

  return (
    <Container style={{ paddingVertical: '20%' }}>
      <Animated.View style={[{ opacity: gameButton }, styles.buttonBlock]}>
        <Button
          onPress={() => {
              // @ts-ignore
              navigation.navigate("Game");
              click()

          }}
        >
          <OrangText>{'Game'}</OrangText>
        </Button>
      </Animated.View>

      <Animated.View style={[{ opacity: pokemonListButton}, styles.buttonBlock]}>
        <Button
          onPress={() => {
              // @ts-ignore
              navigation.navigate("PokemonList");
              click()
          }}
        >
          <OrangText>{'Pokemons'}</OrangText>
        </Button>
      </Animated.View>

      <Animated.View style={[{ opacity: favoritesButton }, styles.buttonBlock]}>
        <Button
          onPress={() => {
              // @ts-ignore
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

const styles = StyleSheet.create({
  buttonBlock: {
    width: "100%",
    alignItems: "center",
  },
});
