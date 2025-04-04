import React, {useEffect} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {Button} from '@/src/StyledComponents';
import {fadeInFadeOutUtil} from '@/utils/fade';
import {useIsFocused} from '@react-navigation/native';
import {SoundController} from '@/utils/sounds';
import {useRefAnimated} from '@/hooks/useRefAnimated';
import {useNavigationHook} from '@/hooks/useNavigation';
import {Routes} from '@/src/AppPouter.types';
import {ContainerUI} from '@/components/ui/ContainerUI';
import {TextUI} from '@/components/ui/TextUI';

export const ScreenMainPage = () => {
  const navigation =  useNavigationHook();
  const click = SoundController.instance.playClick;
  const isFocused = useIsFocused();

  const gameButton = useRefAnimated();
  const pokemonListButton = useRefAnimated();
  const favoritesButton = useRefAnimated();

  useEffect(() => {
    const buttons = [gameButton, pokemonListButton, favoritesButton];
    fadeInFadeOutUtil({items: buttons, isActive: isFocused});
  }, [isFocused]);

  return (
    <ContainerUI style={{ paddingVertical: '20%' }}>
      <Animated.View style={[{ opacity: gameButton }, styles.buttonBlock]}>
        <Button
          onPress={() => {
            navigation.navigate(Routes.Game);
            click().then();
          }}>
          <TextUI type={'orange'} text={'Game'} />
        </Button>
      </Animated.View>

      <Animated.View style={[{ opacity: pokemonListButton}, styles.buttonBlock]}>
        <Button
          onPress={() => {
            navigation.navigate(Routes.PokemonList);
            click().then();
          }}>
          <TextUI type={'orange'} text={'Pokemons'} />
        </Button>
      </Animated.View>

      <Animated.View style={[{ opacity: favoritesButton }, styles.buttonBlock]}>
        <Button
          onPress={() => {
            navigation.navigate(Routes.Favorites);
            click().then();}}>
          <TextUI type={'orange'} text={'Favorites'}/>
        </Button>
      </Animated.View>
    </ContainerUI>
  );
};

const styles = StyleSheet.create({
  buttonBlock: {
    width: '100%',
    alignItems: 'center',
  },
});
