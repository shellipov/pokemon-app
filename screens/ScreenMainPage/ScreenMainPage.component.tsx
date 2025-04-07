import React, { useCallback, useEffect } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { fadeInFadeOutUtil } from '@/utils/fade';
import { useIsFocused } from '@react-navigation/native';
import { SoundController } from '@/utils/sounds';
import { useRefAnimated } from '@/hooks/useRefAnimated';
import { useNavigationHook } from '@/hooks/useNavigation';
import { ContainerUI } from '@/components/ui/ContainerUI';
import { TextUI } from '@/components/ui/TextUI';
import { ButtonUI } from '@/components/ui/ButtonUI/ButtonUI.component';
import { ExampleService } from '@/boot/IoC/example';
import { InversifyConfig } from '@/boot/IoC/inversify.config';

export const ScreenMainPage = () => {
  const navigation = useNavigationHook();
  const click = SoundController.instance.playClick;
  const isFocused = useIsFocused();

  const gameButton = useRefAnimated();
  const pokemonListButton = useRefAnimated();
  const favoritesButton = useRefAnimated();

  const exampleService = InversifyConfig.get<ExampleService>('ExampleService');

  useEffect(() => {
    exampleService.getData();
  }, []);

  useEffect(() => {
    const buttons = [gameButton, pokemonListButton, favoritesButton];
    fadeInFadeOutUtil({ items: buttons, isActive: isFocused });
  }, [isFocused]);

  const toGameScreen = useCallback(() => {
    navigation.navigate('Game');
    click().then();
  }, []);

  const toPokemonListScreen = useCallback(() => {
    navigation.navigate('PokemonList');
    click().then();
  }, []);

  const toFavoritesScreen = useCallback(() => {
    navigation.navigate('Favorites');
    click().then();
  }, []);

  return (
    <ContainerUI style={{ paddingVertical: '20%' }}>
      <Animated.View style={[{ opacity: gameButton }, styles.buttonBlock]}>
        <ButtonUI
          type={'default'} onPress={toGameScreen}>
          <TextUI type={'orange'} text={'Game'} />
        </ButtonUI>
      </Animated.View>

      <Animated.View style={[{ opacity: pokemonListButton }, styles.buttonBlock]}>
        <ButtonUI
          type={'default'} onPress={toPokemonListScreen}>
          <TextUI type={'orange'} text={'Pokemons'} />
        </ButtonUI>
      </Animated.View>

      <Animated.View style={[{ opacity: favoritesButton }, styles.buttonBlock]}>
        <ButtonUI
          type={'default'} onPress={toFavoritesScreen}>
          <TextUI type={'orange'} text={'Favorites'} />
        </ButtonUI>
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
