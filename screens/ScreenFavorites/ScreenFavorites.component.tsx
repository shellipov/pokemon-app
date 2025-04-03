import React, { useEffect, useState } from 'react';
import { View, FlatList, Alert } from 'react-native';
import { Container, OrangText } from '@/src/StyledComponents';
import FavoriteItem from '../../src/FavoriteItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ScreenFavorites = () => {
  const [favoritesList, setFavoritesList] = useState([]);

  const getFavoritesList = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('favorites');

      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.log(e);
    }
  };

  async function deleteItem (id : string) {
    try {
      const jsonValue = await AsyncStorage.getItem('favorites');
      if (jsonValue) {
        const newPokemonLins = JSON.parse(jsonValue).filter(
          (pokemon: {id: string}) => pokemon.id !== id
        );
        await AsyncStorage.setItem('favorites', JSON.stringify(newPokemonLins));
        setFavoritesList(newPokemonLins);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    async function storeData () {
      try {
        const data = await getFavoritesList();
        setFavoritesList(data);
      } catch (e) {
        console.log(e);
      }
    }
    storeData();
  }, []);

  function deletePokemon (id: string) {
    Alert.alert('Are you sure you want to delete it ?', 'Maybe not ?', [
      {
        text: 'Yes',
        onPress: () => deleteItem(id),
      },
      {
        text: 'No',
      },
    ]);
  }

  if (favoritesList && favoritesList?.length === 0) {
    return (
      <Container style={{ justifyContent: 'center', padding: 25 }}>
        <OrangText>there is no one here yet</OrangText>
        <OrangText style={{ fontSize: 10, marginTop: 50 }}>
          Please add someone from the Pokemon list
        </OrangText>
      </Container>
    );
  }

  return (
    <Container>
      <FlatList
        style={{ width: '100%', paddingHorizontal: 20 }}
        data={favoritesList}
        keyExtractor={(item: {id: string}) => item.id}
        renderItem={({ item, index }) => (
          <FavoriteItem item={item} index={index} deletePokemon={deletePokemon} />
        )}
      />
      <View style={{ height: 20 }}></View>
    </Container>
  );
};
