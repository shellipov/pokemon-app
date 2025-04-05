import React, {useEffect} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {fadeInFadeOutUtil} from '@/utils/fade';
import {useIsFocused} from '@react-navigation/native';
import {SoundController} from '@/utils/sounds';
import {useRefAnimated} from '@/hooks/useRefAnimated';
import {useNavigationHook} from '@/hooks/useNavigation';
import {ContainerUI} from '@/components/ui/ContainerUI';
import {TextUI} from '@/components/ui/TextUI';
import {ButtonUI} from '@/components/ui/ButtonUI/ButtonUI.component';

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
        <ButtonUI type={'default'} onPress={() => {
          navigation.navigate('Game');
          click().then();
        }}>
          <TextUI type={'orange'} text={'Game'} />
        </ButtonUI>
      </Animated.View>

      <Animated.View style={[{ opacity: pokemonListButton}, styles.buttonBlock]}>
        <ButtonUI type={'default'} onPress={() => {
          navigation.navigate('PokemonList');
          click().then();
        }}>
          <TextUI type={'orange'} text={'Pokemons'} />
        </ButtonUI>
      </Animated.View>

      <Animated.View style={[{ opacity: favoritesButton }, styles.buttonBlock]}>
        <ButtonUI type={'default'} onPress={() => {
          navigation.navigate('Favorites');
          click().then();}}>
          <TextUI type={'orange'} text={'Favorites'}/>
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
