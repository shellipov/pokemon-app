import React, {useEffect, useRef, useState} from 'react';
import {Container, GrayBackground, LittleButton, OrangText, StyledImage, WhiteText,} from '@/src/StyledComponents';
import {ActivityIndicator, Alert, Animated} from 'react-native';
import {fadeIn} from '@/utils/fade';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api, {IPokemonItem} from '../../api/api';

export interface IPokemon {
  front_default: string,
  back_default: string,
  name: string,
}

export interface IPokemonStorage {
  name: string,
  img1: string,
  img2: string,
}

export const ScreenPokemon = (props: { route: { params: { item: IPokemonItem } }}) => {
  const [pokemon, setPokemon] = useState<{front_default: string, back_default: string} | undefined>(undefined);
  const image1 = useRef(new Animated.Value(0)).current;
  const image2 = useRef(new Animated.Value(0)).current;
  const item  = props.route.params.item;

  const setPokemonToStorage = async (value: IPokemonStorage) => {
    try {
      const id = new Date().toString();
      const jsonData = await AsyncStorage.getItem('favorites');
      const list = jsonData ? JSON.parse(jsonData) : [];
      const soughtPokemon = list.find((pokemon: IPokemon) => pokemon.name === value.name);
      if (!soughtPokemon) {
        list.push({ ...value, id });
        const jsonValue = JSON.stringify(list);
        await AsyncStorage.setItem('favorites', jsonValue);
      } else {
        Alert.alert('this pokemon has already been added to favorites');
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    async function fetchMyAPI () {
      const data = await Api.getURL(item.url);
      setPokemon(data.sprites);
    }
    fetchMyAPI();
  }, []);

  if (pokemon) {
    return (
      <Container style={{ padding: 24 }}>
        <GrayBackground
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'space-between',
          }}
        >
          <OrangText>{item.name}</OrangText>
          <Animated.View
            style={{ width: '100%', height: '30%', opacity: image1 }}
          >
            <StyledImage
              style={{ width: '100%', height: '100%' }}
              onLoad={() => fadeIn(image1)}
              source={{
                uri: item.front,
              }}
            />
          </Animated.View>
          <Animated.View
            style={{ width: '100%', height: '30%', opacity: image2 }}>
            <StyledImage
              style={{ width: '100%', height: '100%' }}
              onLoad={() => fadeIn(image2)}
              source={{
                uri: item.back,
              }}/>
          </Animated.View>
          <WhiteText
          >{`weight: ${item.weight},   height: ${item.height}`}
          </WhiteText>

          <LittleButton
            style={{ width: '100%' }}
            onPress={() => {
              setPokemonToStorage({
                name: item.name,
                img1: pokemon?.front_default,
                img2: pokemon?.back_default,
              });
            }}>
            <OrangText>add to fovarites</OrangText>
          </LittleButton>
        </GrayBackground>
      </Container>
    );
  } else {
    return (
      <>
        <Container style={{ padding: 24 }}>
          <ActivityIndicator size="small" />
        </Container>
      </>
    );
  }
};
