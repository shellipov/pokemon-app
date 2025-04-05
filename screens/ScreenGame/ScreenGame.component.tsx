import React, {useEffect, useRef, useState} from 'react';
import {Animated, SafeAreaView, StyleProp, useColorScheme, View, ViewStyle} from 'react-native';
import {GameBackground, StyledImage} from '@/src/StyledComponents';
import {ModalWindow} from '@/src/ModalWindow';
import {setMaximumPointsPerGame, setStorageStatisticsPlusValue,} from '@/utils/statistics';
import {fadeIn, fadeOut} from '@/utils/fade';
import {sizeDownAnimation, sizeUpAnimation} from '@/utils/changeSize';
import Api, {IPokemonItem, IPokemonItemShort, IPokemonItemShortObject} from '@/api/api';
import {ReactionEnum, SoundController} from '@/utils/sounds';
import {useNavigationHook} from '@/hooks/useNavigation';
import {ThemedView} from '@/components/ThemedView';
import {TextUI} from '@/components/ui/TextUI';
import {ButtonUI} from '@/components/ui/ButtonUI/ButtonUI.component';

export const ScreenGame = () => {
  const navigation = useNavigationHook();
  const colorScheme = useColorScheme();
  const isBlackTheme = colorScheme === 'dark';

  const [posts, setPosts] = useState<IPokemonItemShortObject>();
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(2);
  const [round, setRound] = useState(1);
  const [counter, setCounter] = useState(6);
  const [truePokemon, setTruePokemon] = useState<IPokemonItem> ();
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
    if (buttonName !== truePokemon?.name) {
      playReaction(ReactionEnum.losing).then();
    }
  }

  function buttonStyles (buttonName: string) {
    const background = userAnswer ? { backgroundColor: buttonName === truePokemon?.name ? 'green' : 'red'} : {};

    return [
      { width: 'auto', marginLeft: 0, align: 'center', ...background }
    ];
  }

  function randomPokemon (): IPokemonItemShort {
    const letters = Object.keys(posts || []);
    const oneLetter = letters[Math.floor(Math.random() * letters.length)];
    const pokemonList = posts?.[oneLetter] || [];

    return pokemonList?.[Math.floor(Math.random() * pokemonList?.length)];
  }

  function createButtons (correctAnswer: string) {
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
      if(detailedPokemon){
        setTruePokemon(detailedPokemon);
        createButtons(detailedPokemon.name);
      }
      fadeIn(gameWindow, 100);
      fadeIn(textView, 200);
      fadeIn(imageView, 500);
      fadeIn(buttonsView, 1000);
      fadeIn(counterView, 1200);
      sizeUpAnimation(animationValue);
      setCounter(6);
    }
    getPokemon().then();
  }, [round, posts]);

  useEffect(() => {
    if ((counter === 0 && !userAnswer) || (lives <= 0 && !userAnswer)) {
      setModalVisible(true);
      playReaction(ReactionEnum.gameOver).then();
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
    if (answer === truePokemon?.name) {
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


  const HeaderBlock = () => {
    return (
      <Animated.View style={{flex: 1 }}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>

          <ButtonUI type={'small'} onPress={navigation.goBack} style={{width: '30%'}}>
            <TextUI type={'orange'} text={'back'} style={{ padding: 0, fontSize: 12, lineHeight: 21 }} />
          </ButtonUI>

          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
            <TextUI type={'orange'} text={'❤️'} style={{ fontSize: 18 }} />
            <TextUI type={'orange'}>{lives}</TextUI>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextUI type={'orange'} style={{ fontSize: 10 }} text={'Score:'} />
            <TextUI type={'orange'} text={score} />
          </View>

        </View>

        <TextUI type={'white'} style={{marginTop: 30, fontSize: 15}} text={'Do you know who is it?'}/>
      </Animated.View>
    );
  };

  const GameBlock = () => {
    return (
      <>
        {/*counterBlock*/}
        <Animated.View style={{ opacity: counterView, flex: 1 }}>
          <TextUI type={'orange'} text={counter} style={{fontSize: 30, color: counter < 3 ? 'rgb(209, 25, 25)' : 'orange'}} />
        </Animated.View>

        {/*imageBlock*/}
        <Animated.View style={{opacity: imageView, transform: [{ scale: animationValue }], flex: 2}}>
          <StyledImage style={{height: 200, width: 200}} source={{ uri: truePokemon?.front }}/>
        </Animated.View>
      </>
    );
  };

  const ButtonsBlock = () => {
    return (
      <Animated.View
        style={{opacity: buttonsView, flex: 2, width: '100%', paddingBottom: 20}}>
        {buttons.map((button) => {
          const blockStyle = {height: '25%', width: '100%', paddingHorizontal: 20, flexDirection: 'column-reverse'}  as StyleProp<ViewStyle>;
          const buttonStyle = buttonStyles(button.name) as StyleProp<ViewStyle>;

          return (
            <View key={button.id.toString()} style={blockStyle}>
              <ButtonUI type={'small'} disabled={!!userAnswer} style={buttonStyle} onPress={() => {clickButton(button.name);}}>
                <TextUI type={'orange'} text={button.name} style={{ padding: 0, fontSize: 12, lineHeight: 21 }} />
              </ButtonUI>
            </View>
          );
        })}
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isBlackTheme ? 'rgb(24, 24, 24)' : 'white'}}>
      <ThemedView style={{
        padding: 20,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around'}}>
        <GameBackground style={{opacity: gameWindow}}>
          <HeaderBlock />
          <GameBlock/>
          <ButtonsBlock />
        </GameBackground>
        <ModalWindow modalVisible={modalVisible} setModalVisible={setModalVisible} score={score} counter={counter}/>
      </ThemedView>
    </SafeAreaView>
  );
};
