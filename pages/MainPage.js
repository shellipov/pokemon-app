import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { mainStyles } from "../styles/styles";

const MainPage = ({ isBlacktheme, navigation }) => {
  const button1 = useRef(new Animated.Value(0)).current;
  const button2 = useRef(new Animated.Value(0)).current;
  const button3 = useRef(new Animated.Value(0)).current;
  const button4 = useRef(new Animated.Value(0)).current;

  const fadeIn = (element, timeout) => {
    setTimeout(() => {
      Animated.timing(element, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }, timeout);
  };
  const fadeOut = (element, timeout) => {
    setTimeout(() => {
      Animated.timing(element, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }, timeout);
  };

  useEffect(()=>{
    fadeIn(button1, 150)
    fadeIn(button2, 300)
    fadeIn(button3, 450)
    fadeIn(button4, 600)
  },[])
  
  // function exitAnimation (){
  //   fadeOut(button1, 100)
  //   fadeOut(button2, 200)
  //   fadeOut(button3, 300)
  //   fadeOut(button4, 400)
  // }



  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: isBlacktheme ? "rgb(24, 24, 24)" : "white",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          paddingVertical: 100,
        },
      ]}
    >
      <Animated.View style={{ opacity: button1, width: '100%', alignItems: 'center' }}>
        <TouchableOpacity
          style={style.button}
          onPress={() => {navigation.navigate("Game")}}
        >
          <Text style={mainStyles.titleFont}>Game</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={{ opacity: button2, width: '100%', alignItems: 'center' }}>
        <TouchableOpacity
          style={style.button}
          onPress={() => {navigation.navigate("Pokemons")}}
        >
          <Text style={mainStyles.titleFont}>Pokemons</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={{ opacity: button3, width: '100%', alignItems: 'center' }}>
        <TouchableOpacity
          style={style.button}
          onPress={() => {navigation.navigate("Favorites")}}
        >
          <Text style={mainStyles.titleFont}>Favorites</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={{ opacity: button4, width: '100%', alignItems: 'center' }}>
        <TouchableOpacity
          style={style.button}
          onPress={() => {navigation.navigate("Settings")}}
        >
          <Text style={mainStyles.titleFont}>Settings</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default MainPage;

const style = StyleSheet.create({
  button: {
    backgroundColor: "gray",
    width: "50%",
    paddingVertical: 30,
    borderRadius: 20,
    shadowColor: "gray",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 1,
    borderColor: "black",
    borderWidth: 1,
  },
});
