import React, {useEffect, useState} from 'react';
import {Alert, FlatList, View} from 'react-native';
import FavoriteItem from '../../src/FavoriteItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextUI} from '@/components/ui/TextUI';
import {ContainerUI} from '@/components/ui/ContainerUI';
import {IPokemonStorage} from '@/screens/ScreenPokemon';

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

  async function deleteItem (id?: string) {
    try {
      const jsonValue = await AsyncStorage.getItem('favorites');
      if (jsonValue && id) {
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

  function deletePokemon (id?: string) {
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
      <ContainerUI style={{ justifyContent: 'center', padding: 25 }}>
        <TextUI type={'orange'} text={'there is no one here yet'} />
        <TextUI type={'orange'} text={'Please add someone from the Pokemon list'} style={{ fontSize: 10, marginTop: 50 }} />
      </ContainerUI>
    );
  }

  return (
    <ContainerUI>
      <FlatList
        style={{ width: '100%', paddingHorizontal: 20 }}
        data={favoritesList}
        keyExtractor={(item: {id: string}) => item.id}
        renderItem={({ item, index }) => (
          <FavoriteItem item={item as IPokemonStorage} index={index} deletePokemon={deletePokemon} />
        )}
      />
      <View style={{ height: 20 }}></View>
    </ContainerUI>
  );
};
