import React, { useCallback, useEffect, useState } from 'react';
import { GrayBackground, StyledImage } from '@/src/StyledComponents';
import { ActivityIndicator, Animated } from 'react-native';
import { fadeIn } from '@/utils/fade';
import { setPokemonToStorage } from '@/src/service/PokemonStorage';
import Api, { IPokemonItem } from '../../api/api';
import { ContainerUI } from '@/components/ui/ContainerUI';
import { TextUI } from '@/components/ui/TextUI';
import { ButtonUI } from '@/components/ui/ButtonUI/ButtonUI.component';
import { InversifyConfig } from '@/boot/IoC/inversify.config';
import { GetPokemonDataStore } from '@/api/getPokemonDataStore';
import { useRefAnimated } from '@/hooks/useRefAnimated';

export interface IPokemon {
  front_default: string,
  back_default: string,
  name: string,
}

// TODO: перенести в метод
export interface IPokemonStorage {
  id?: string,
  name: string,
  img1: string,
  img2: string,
}

export const ScreenPokemon = (props: { route: { params: { item: IPokemonItem } }}) => {
  const [pokemon, setPokemon] = useState<{front_default: string, back_default: string} | undefined>(undefined);
  const image1 = useRefAnimated();
  const image2 = useRefAnimated();
  const item = props.route.params.item;
  const pokemonDataStore = InversifyConfig.get<GetPokemonDataStore>('GetPokemonDataStore');

  async function fetchMyAPI () {
    const data = await Api.getURL(item.url);
    setPokemon(data.sprites);
  }

  useEffect(() => {
    fetchMyAPI().then();
    pokemonDataStore.refresh({ name: item.name }).then();
  }, []);

  const onLoadFrontImg = useCallback(() => {fadeIn(image1);}, []);
  const onLoadBackImg = useCallback(() => {fadeIn(image2);}, []);

  const onAddToFavorites = useCallback(() => {
    setPokemonToStorage({
      name: item.name,
      img1: pokemon?.front_default || '',
      img2: pokemon?.back_default || '',
    }).then();
  }, []);

  if (pokemon) {
    return (
      <ContainerUI style={{ padding: 24 }}>
        <GrayBackground style={{ width: '100%', height: '100%', justifyContent: 'space-between' }}>
          <TextUI type={'orange'} text={pokemonDataStore.data?.data.name} />
          <Animated.View style={{ width: '100%', height: '30%', opacity: image1 }}>
            <StyledImage style={{ width: '100%', height: '100%' }} onLoad={onLoadFrontImg} source={{ uri: item.front }} />
          </Animated.View>
          <Animated.View style={{ width: '100%', height: '30%', opacity: image2 }}>
            <StyledImage style={{ width: '100%', height: '100%' }} onLoad={onLoadBackImg} source={{ uri: item.back }} />
          </Animated.View>
          <TextUI type={'white'} text={`base_experience: ${pokemonDataStore.data?.data.base_experience}`} />
          <TextUI type={'white'} text={pokemonDataStore.model.weightAndHeight} />
          <ButtonUI type={'small'} style={{ width: '100%' }} onPress={onAddToFavorites}>
            <TextUI type={'orange'} text={'add to favorites'} />
          </ButtonUI>
        </GrayBackground>
      </ContainerUI>
    );
  } else {
    return (
      <ContainerUI style={{ padding: 24 }}>
        <ActivityIndicator size="small" />
      </ContainerUI>
    );
  }
};
