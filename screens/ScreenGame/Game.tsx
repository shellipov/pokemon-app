import React, {useEffect, useRef, useState} from 'react';
import {Animated, SafeAreaView, View} from 'react-native';
import {Container, GameBackground, LittleButton, OrangText, StyledImage, WhiteText,} from '@/src/StyledComponents';
import ModalWindow from '../../src/ModalWindow';
import {setMaximumPointsPerGame, setStorageStatisticsPlusValue,} from '@/utils/statistics';
import {fadeIn, fadeOut} from '@/utils/fade';
import {sizeDownAnimation, sizeUpAnimation} from '@/utils/changeSize';
import Api from '@/api/api';
import {ReactionEnum, SoundController} from '@/utils/sounds';
import {useNavigationHook} from '@/hooks/useNavigation';

interface IPokemon {     id?: string;     name?: string;     front?: string;     back?: string;     weight?: string;     height?: string;     url?: string; }

const Game = () => {
  const navigation = useNavigationHook();
  const [posts, setPosts] = useState<{}>();
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(2);
  const [round, setRound] = useState(1);
  const [counter, setCounter] = useState(6);
  const [truePokemon, setTruePokemon] = useState<IPokemon> ({});
  const [buttons, setButtons] = useState<{id: string, name: string}[]>([]);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const playClick = SoundController.instance.playClick;
  const playReaction = SoundController.instance.playReaction;

  const gameWindow = useRef(new Animated.Value(0)).current;
  const textView = useRef(new Animated.Value(0)).current;
  const counterView = useRef(new Animated.Value(0)).current;
  const imageView = useRef(new Animated.Value(0)).current;
  const buttonsView = useRef(new Animated.Value(0)).current;
  const animationValue = useRef(new Animated.Value(1)).current;

  //styled functions
  function clickButton (buttonName: string) {
    getAnswer(buttonName);
    playClick().then();
    if (buttonName === truePokemon?.name) {
      playReaction(ReactionEnum.victory).then();
    }
    if (buttonName !== truePokemon.name) {
      playReaction(ReactionEnum.losing).then();
    }
  }

  function buttonStyles (buttonName: string) {
    const background = userAnswer ? { backgroundColor: buttonName === truePokemon.name ? 'green' : 'red'} : {};

    return [
      { width: 'auto', marginLeft: 0, align: 'center', ...background }
    ];
  }

  function randomPokemon () {
    const letters = Object.keys(posts);
    const oneLetter = letters[Math.floor(Math.random() * letters.length)];
    const pokemonlist = posts[oneLetter];

    return pokemonlist[Math.floor(Math.random() * pokemonlist.length)];
  }

  function createButtons (correctAnswer) {
    const buttonArray = [];
    for (let i = 0; i < 4; i++) {
      buttonArray.push({ name: randomPokemon().name, id: i.toString() });
    }
    const indexCorrectAnswer = Math.floor(Math.random() * 4);
    buttonArray[indexCorrectAnswer].name = correctAnswer;
    setButtons(buttonArray);
  }

  useEffect(() => {
    async function fetchMyAPI () {
      const data = await Api.newGetPost();
      setPosts(data);
    }
    fetchMyAPI();
  }, []);

  useEffect(() => {
    async function getPokemon () {
      const pokemon = randomPokemon();
      const response = await Api.getDetailedList([pokemon]);
      const detailedPokemon = response?.[0];
      console.log('>>> wright Answer - ', detailedPokemon?.name);
      setTruePokemon(detailedPokemon);
      createButtons(detailedPokemon.name);
      fadeIn(gameWindow, 100);
      fadeIn(textView, 200);
      fadeIn(imageView, 500);
      fadeIn(buttonsView, 1000);
      fadeIn(counterView, 1200);
      sizeUpAnimation(animationValue);
      setCounter(6);
    }
    getPokemon();
  }, [round, posts]);

  useEffect(() => {
    if ((counter === 0 && !userAnswer) || (lives <= 0 && !userAnswer)) {
      setModalVisible(true);
      // playReaction("gameOver");
      setTimeout(() => {
        fadeOut(gameWindow, 1000);
      }, 200);

      return;
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
  }, [counter]);

  useEffect(() => {
    (async () => {
      setStorageStatisticsPlusValue('totalGamesPlayed').then();
    })();

    return;
  }, []);

  const getAnswer = (answer: string) => {
    fadeOut(counterView, 0);
    setUserAnswer(answer);
    if (answer === truePokemon.name) {
      setLives((prev) => prev + 1);
      setScore((prev) => prev + 1);
      setStorageStatisticsPlusValue('allCorrectAnswers').then();
      setMaximumPointsPerGame(score + 1).then();
    } else {
      setLives((prev) => prev - 1);
      setStorageStatisticsPlusValue('totalWrongAnswers').then();
    }
    fadeOut(imageView);
    fadeOut(buttonsView);
    setTimeout(() => {
      setUserAnswer(null);
      sizeDownAnimation(animationValue);
      setRound((prev) => prev + 1);
    }, 1500);
  };

  const Buttons = () => {
    return (
      <Animated.View
        style={{opacity: buttonsView, flex: 2, width: '100%', paddingBottom: 20}}>
        {buttons.map((button) => {
          const blockStyle = {height: '25%', width: '100%', paddingHorizontal: 20, flexDirection: 'column-reverse'};
          const buttonStyle = buttonStyles(button.name);

          return (
            <View key={button.id.toString()} style={blockStyle}>
              <LittleButton
                disabled={!!userAnswer}
                style={buttonStyle}
                onPress={() => {
                  clickButton(button.name);
                }}>
                <OrangText style={{ padding: 0, fontSize: 12, lineHeight: 21 }}>
                  {button.name}
                </OrangText>
              </LittleButton>
            </View>
          );
        })}
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Container style={{ padding: 20 }}>
        <GameBackground style={{opacity: gameWindow}}>
          <Animated.View style={{flex: 1 }}>

            {/*headerBlock*/}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <OrangText style={{ fontSize: 18 }}>❤️</OrangText>
                <OrangText>{lives}</OrangText>
              </View>

              <LittleButton onPress={navigation.goBack} style={{width: '30%'}}>
                <OrangText style={{ padding: 0, fontSize: 12, lineHeight: 21 }}>
                  {'back'}
                </OrangText>
              </LittleButton>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <OrangText style={{ fontSize: 10 }}>Score:</OrangText>
                <OrangText>{score}</OrangText>
              </View>
            </View>

            {/*questionBlock*/}
            <WhiteText
              style={{
                marginTop: 30,
                fontSize: 15,
              }}>
            Do you know who is it?
            </WhiteText>
          </Animated.View>

          {/*counterBlock*/}
          <Animated.View style={{ opacity: counterView, flex: 1 }}>
            <OrangText
              style={{
                fontSize: 30,
                color: counter < 3 ? 'rgb(209, 25, 25)' : 'orange',
              }}>
              {counter}
            </OrangText>
          </Animated.View>

          {/*imageBlock*/}
          <Animated.View
            style={{
              opacity: imageView,
              transform: [{ scale: animationValue }],
              flex: 2,
            }}>
            <StyledImage
              style={{
                height: 200,
                width: 200,
              }}
              source={{ uri: truePokemon.front }}/>
          </Animated.View>

          <Buttons />
        </GameBackground>
        <ModalWindow modalVisible={modalVisible} setModalVisible={setModalVisible} score={score} counter={counter}/>
      </Container>
    </SafeAreaView>
  );
};

export default Game;
