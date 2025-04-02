import React, { useEffect, useState, useRef } from 'react';
import {
  Container,
  GrayBackground,
  StyledImage,
  OrangText,
  WhiteText,
  LittleButton,
} from '@/src/StyledComponents';
import {ActivityIndicator, Alert, Animated, View, Text} from 'react-native';
import { fadeIn } from '@/utils/fade';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../api/api';

const Pokemon = ({ route }) => {
  const [pokemon, setPokemon] = useState(null);
  const image1 = useRef(new Animated.Value(0)).current;
  const image2 = useRef(new Animated.Value(0)).current;
  const { item } = route.params;

  const setPokemonToStorage = async (value) => {
    try {
      const id = new Date().toString();
      const jsonData = await AsyncStorage.getItem('favorites');
      const list = jsonData ? JSON.parse(jsonData) : [];
      const soughtPokemon = list.find((pokemon) => pokemon.name === value.name);
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
    async function fetchMyAPI() {
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
            style={{ width: '100%', height: '30%', opacity: image2 }}
          >
            <StyledImage
              style={{ width: '100%', height: '100%' }}
              onLoad={() => fadeIn(image2)}
              source={{
                uri: item.back,
              }}
            />
          </Animated.View>
          <WhiteText
          >{`weight: ${item.weight},   height: ${item.heyght}`}</WhiteText>

          <LittleButton
            style={{ width: '100%' }}
            onPress={() => {
              setPokemonToStorage({
                name: item.name,
                img1: pokemon?.front_default,
                img2: pokemon.back_default,
              });
              // playClick();
            }}
          >
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

export default Pokemon;
