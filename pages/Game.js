import React, { useEffect, useState, useRef } from "react";
import Api from "../api/api";
import { View, Animated } from "react-native";
import {
  OrangText,
  WhiteText,
  StyledImage,
  LittleButton,
  Container,
  GameBackground,
} from "../src/StyledComponents";
import ModalWindow from "../src/ModalWindow";
import { fadeIn, fadeOut } from "../utils/fade";

const Game = ({ isBlacktheme, posts, navigation, playClick, playReaction }) => {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(10);
  const [round, setRound] = useState(1);
  const [counter, setCounter] = useState(6);
  const [truePokemon, setTruePokemon] = useState({});
  const [buttons, setButtons] = useState([]);
  const [userAnswer, setUserAnswer] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const gameWindow = useRef(new Animated.Value(0)).current;
  const textView = useRef(new Animated.Value(0)).current;
  const counterView = useRef(new Animated.Value(0)).current;
  const imageView = useRef(new Animated.Value(0)).current;
  const buttonsView = useRef(new Animated.Value(0)).current;

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

  function clickButton(buttonName) {
    getAnswer(buttonName);
    playClick();
    if (buttonName === truePokemon.name) {
      playReaction("victory");
    }
    if (buttonName !== truePokemon.name) {
      playReaction("losing");
    }
  }

  function buttonStyles(buttonName) {
    return [
      { width: "auto", marginLeft: 0, align: "center"
    },
      userAnswer && buttonName === truePokemon.name
        ? {
            backgroundColor: "green",
          }
        : null,
      userAnswer && buttonName !== truePokemon.name
        ? {
            backgroundColor: "red",
          }
        : null,
    ];
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
    if ((counter === 0 && !userAnswer) || (lives <= 0 && !userAnswer)) {
      setModalVisible(true);
      playReaction("gameOver");
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
    <Container style={{ padding: 20 }} isBlacktheme={isBlacktheme}>
      <ModalWindow
        navigation={navigation}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        score={score}
        counter={counter}
        playClick={playClick}
      />

      <Animated.View
        style={{
          opacity: gameWindow,
          width: "100%",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "gray",
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
              <OrangText style={{ fontSize: 18 }}>❤️</OrangText>
              <OrangText>{lives}</OrangText>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <OrangText style={{ fontSize: 10 }}>Score:</OrangText>
              <OrangText>{score}</OrangText>
            </View>
          </View>
          <WhiteText
            isBlacktheme={isBlacktheme}
            style={{
              marginTop: 30,
              fontSize: 15,
            }}
          >
            Do you know who is it?
          </WhiteText>
        </Animated.View>
        <Animated.View style={{ opacity: counterView, flex: 1 }}>
          <OrangText 
            style={{
              fontSize: 30,
              color: counter < 3 ? "rgb(209, 25, 25)" : "orange",
            }}
          >
            {counter}
          </OrangText>
        </Animated.View>
        <Animated.View style={{ opacity: imageView, flex: 2 }}>
          <StyledImage
            style={{
              height: 200,
              width: 200,
            }}
            source={{ uri: truePokemon.front }}
          />
        </Animated.View>
        <Animated.View
          style={{
            opacity: buttonsView,
            flex: 2,
            width: "100%",
            paddingBottom: 20,
          }}
        >
          {buttons.map((button) => (
            <View
              key={button.id.toString()}
              style={{
                height: "25%",
                width: "100%",
                paddingHorizontal: 20,
                flexDirection: "column-reverse",
              }}
            >
              <LittleButton
                isBlacktheme={isBlacktheme}
                disabled={userAnswer}
                style={buttonStyles(button.name)}
                onPress={() => {
                  clickButton(button.name);
                }}
              >
                <OrangText style={{ padding: 0, fontSize: 12, lineHeight:21 }}>{button.name}</OrangText>
              </LittleButton>
            </View>
          ))}
        </Animated.View>
      </Animated.View>
    </Container>
  );
};

export default Game;
