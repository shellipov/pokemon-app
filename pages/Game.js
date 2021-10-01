import React, { useEffect, useState, useRef } from "react";
import { mainStyles } from "../styles/styles";
import Api from "../api/api";
import {
  View,
  Text,
  Image,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";

const Game = ({ isBlacktheme, posts, navigation }) => {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(10);
  const [round, setRound] = useState(1);
  const [truePokemon, setTruePokemon] = useState({});
  const [counter, setCounter] = useState(6);
  const [buttons, setButtons] = useState([]);
  const [userAnswer, setUserAnswer] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const gameWindow = useRef(new Animated.Value(0)).current;
  const textView = useRef(new Animated.Value(0)).current;
  const counterView = useRef(new Animated.Value(0)).current;
  const imageView = useRef(new Animated.Value(0)).current;
  // const imageSize = useRef(new Animated.Value(200)).current;
  const buttonsView = useRef(new Animated.Value(0)).current;

  const fadeIn = (element, timeout) => {
    setTimeout(() => {
      Animated.timing(element, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }, timeout);
  };
  const fadeOut = (element, duration = 1500) => {
    Animated.timing(element, {
      toValue: 0,
      duration: duration,
      useNativeDriver: true,
    }).start();
  };

  // const growing = () => {
  //     Animated.timing(imageSize, {
  //       toValue: 300,
  //       duration: 10000,
  //       useNativeDriver: true,
  //     }).start();
  // };

  function randonPokemon() {
    const letters = Object.keys(posts);
    const oneLetter = letters[Math.floor(Math.random() * letters.length)];
    const pokemonlist = posts[oneLetter];
    const pokemon = pokemonlist[Math.floor(Math.random() * pokemonlist.length)];
    return pokemon;
  }

  function createButtons(correctAnswer) {
    const buttonArray = [];
    for (let i = 0; i < 4; i++) {
      buttonArray.push({ name: randonPokemon().name, id: i.toString() });
    }
    const indexCorrectAnswer = Math.floor(Math.random() * 4);
    buttonArray[indexCorrectAnswer].name = correctAnswer;
    setButtons(buttonArray);
  }

  useEffect(() => {
    async function getPokemon() {
      const pokemon = randonPokemon();
      const responce = await Api.getDetailedList([pokemon]);
      const detailedPokemon = responce[0];
      setTruePokemon(detailedPokemon);
      createButtons(detailedPokemon.name);
      fadeIn(gameWindow, 100);
      fadeIn(textView, 200);
      fadeIn(imageView, 500);
      fadeIn(buttonsView, 1000);
      fadeIn(counterView, 1200);
      setCounter(6);
    }
    getPokemon();
  }, [round]);

  useEffect(() => {
    const startCounter = () => {};
    if (counter === 0 || lives <= 0) {
      setModalVisible(true);
      fadeOut(gameWindow, 500);
    }
    if (counter != 0 && !userAnswer) {
      const timer = setTimeout(
        () => {
          setCounter((prev) => prev - 1);
        },
        counter === 6 ? 2000 : 1000
      );
      return () => clearInterval(timer);
    }
    startCounter();
  }, [counter]);

  const getAnswer = (answer) => {
    fadeOut(counterView, 0);
    setUserAnswer(answer);
    if (answer === truePokemon.name) {
      setLives((prev) => prev + 1);
      setScore((prev) => prev + 1);
    } else {
      setLives((prev) => prev - 1);
    }
    fadeOut(imageView);
    fadeOut(buttonsView);
    setTimeout(() => {
      setUserAnswer(null);
      setRound((prev) => prev + 1);
    }, 1500);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isBlacktheme ? "rgb(24, 24, 24)" : "white",
      }}
    >
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={[mainStyles.comix, { fontSize: 25 }]}>Game Over</Text>
            <Text style={[mainStyles.comix, { fontSize: 13, marginTop: 30 }]}>
              {counter === 0 ? "time is up" : "no more lifes"}
            </Text>
            <Text style={[mainStyles.comix, { fontSize: 13, marginTop: 9 }]}>
              You score: {score}
            </Text>
            <Pressable
              style={styles.closeButton}
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate("MainPage");
              }}
            >
              <Text style={mainStyles.comixWhite}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Animated.View
        style={{
          opacity: gameWindow,
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "gray",
          margin: 20,
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
        }}
      >
        <Animated.View style={{ opacity: textView, flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Text style={[mainStyles.titleFont, { fontSize: 18 }]}>❤️</Text>
              <Text style={mainStyles.titleFont}>{lives}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[mainStyles.titleFont, { fontSize: 10 }]}>
                Score:
              </Text>
              <Text style={mainStyles.titleFont}>{score}</Text>
            </View>
          </View>
          <Text
            style={[
              mainStyles.comixWhite,
              {
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 30,
                fontSize: 15,
              },
            ]}
          >
            Do you know who is it?
          </Text>
        </Animated.View>
        <Animated.View style={{ opacity: counterView, flex: 1 }}>
          <Text
            style={[
              mainStyles.titleFont,
              {
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                fontSize: 30,
                color: counter < 3 ? "rgb(209, 25, 25)" : "orange",
              },
            ]}
          >
            {counter}
          </Text>
        </Animated.View>
        <Animated.View style={{ opacity: imageView, flex: 2 }}>
          {/* <Animated.View style={{ height: imageSize, width: imageSize}}> */}

          <Image
            style={{
              height: 200,
              width: 200,
              shadowColor: "rgb(41, 41, 41)",
              shadowOffset: {
                width: 2,
                height: 2,
              },
              shadowOpacity: 1,
              shadowRadius: 1,
            }}
            source={{ uri: truePokemon.front }}
          ></Image>
          {/* </Animated.View> */}
        </Animated.View>
        <Animated.View
          style={{
            opacity: buttonsView,
            flex: 2,
            width: "100%",
            paddingBottom: 20,
          }}
        >
          {/* <FlatList
            data={buttons}
            keyExtractor={(item) => item.id}
            renderItem={(buttons) => (
              <TouchableOpacity
                style={styles.button}
                onPress={() => getAnswer(buttons.item.name)}
              >
                <Text style={mainStyles.titleFont}>{buttons.item.name}</Text>
              </TouchableOpacity>
            )}
          /> */}
          {buttons.map((button) => (
            <View
              key={button.id.toString()}
              style={{
                height: "25%",
                width: "100%",
                flexDirection: "column-reverse",
              }}
            >
              <TouchableOpacity
                style={[
                  styles.button,
                  userAnswer && button.name === truePokemon.name
                    ? {
                        backgroundColor: "green",
                      }
                    : null,
                  userAnswer && button.name !== truePokemon.name
                    ? {
                        backgroundColor: "red",
                      }
                    : null,
                ]}
                onPress={() => getAnswer(button.name)}
              >
                <Text style={mainStyles.titleFont}>{button.name}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default Game;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
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
    marginHorizontal: 20,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    backgroundColor: "rgba(0, 0, 0, 0.747)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 35,
    paddingVertical: 100,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    backgroundColor: "gray",
    marginTop: 30,
    paddingVertical: 15,
    paddingHorizontal: 15,
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
