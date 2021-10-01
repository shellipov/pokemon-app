import React, { useEffect, useState, useRef } from "react";
import { mainStyles } from "../styles/styles";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Favorites = ({isBlacktheme}) => {
  const [favoritesList, setFavoritesList] = useState([]);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true
    }).start();
  };

  const getIsBlackThemeStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("favorites");
      return jsonValue != null ? JSON.parse(jsonValue) : false;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fadeIn()
    async function storeData() {
      try {
        data = await getIsBlackThemeStorage();
        setFavoritesList(data);
      } catch (e) {
        console.log(e);
      }
    }
    storeData();
  }, []);

  async function deleteItem(id) {
    try {
      const jsonValue = await AsyncStorage.getItem("favorites");
      const newPokemonLins = JSON.parse(jsonValue).filter(
        (pokemon) => pokemon.id !== id
      );
      await AsyncStorage.setItem("favorites", JSON.stringify(newPokemonLins));
      setFavoritesList(newPokemonLins);
    } catch (e) {
      console.log(e);
    }
  }

  function deletePokemom(id) {
    Alert.alert("Are you sure you want to delete it ?", "Maybe not ?", [
      {
        text: "Yes",
        onPress: () => deleteItem(id),
      },
      {
        text: "No",
      },
    ]);
  }
  if(favoritesList.length === 0){
    return (
      <View style={{ flex: 1, backgroundColor: isBlacktheme? 'rgb(24, 24, 24)': 'white', justifyContent: 'center', alignItems: "center", padding: 40}}>
        <Text style={mainStyles.titleFont}>there is no one here yet</Text>
        <Text style={[mainStyles.titleFont, {fontSize: 10, marginTop: 50}]}>Please add someone from the Pokemon list</Text>
      </View>


    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: isBlacktheme? 'rgb(24, 24, 24)': 'white' }}>
      <FlatList
        data={favoritesList}
        keyExtractor={(item) => item.id}
        renderItem={(favoritesList) => (
          <Animated.View style={{opacity: fadeAnim}}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "gray",
                marginTop: 20,
                marginHorizontal: 20,
                borderRadius: 10,
                borderWidth: 1,
                shadowColor: "gray",
                shadowOffset: {
                  width: 1,
                  height: 1,
                },
                shadowOpacity: 1,
                shadowRadius: 1,
                elevation: 1,
                position: "relative",
              }}
            >
              <Text style={mainStyles.favotiveFont}>
                {favoritesList.item.name}
              </Text>
              <TouchableOpacity
                onPress={() => deletePokemom(favoritesList.item.id)}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  borderWidth: 1,
                  backgroundColor: "white",
                  borderRadius: 8,
                  height: 30,
                }}
              >
                <Text style={{ ...mainStyles.delete, paddingBottom: 10 }}>
                  del
                </Text>
              </TouchableOpacity>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Image
                  style={{
                    width: "45%",
                    height: 150,
                    shadowColor: "rgb(41, 41, 41)",
                    shadowOffset: {
                      width: 1,
                      height: 1,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 1,
                  }}
                  source={{
                    uri: favoritesList.item.img1,
                  }}
                />
                <Image
                  style={{
                    width: "45%",
                    height: 150,
                    shadowColor: "rgb(41, 41, 41)",
                    shadowOffset: {
                      width: 1,
                      height: 1,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 1,
                  }}
                  source={{
                    uri: favoritesList.item.img2,
                  }}
                />
              </View>
            </View>
          </Animated.View>
        )}
      />
      <View style={{ height: 20 }}></View>
    </View>
  );
};

export default Favorites;
