import React, { useState, useEffect } from "react";
import AppRouter from "./src/AppRouter";
import AppLoading from "expo-app-loading";
import Api from "./api/api";
import { fonts } from "./styles/styles";
import { Audio } from 'expo-av';
import {
  StatusBar,
  ActivityIndicator,
} from "react-native";

export default function App() {
  const [isFontsLoad, setIsFontsLoad] = useState(false);
  const [posts, setPosts] = useState(null);
  const [pages, setPages] = useState([]);
  const [music, setMusic] = useState(null);

  async function playClick() {
    const { sound } = await Audio.Sound.createAsync(
       require('./assets/click.mp3')
    );
    await sound.playAsync(); }

  async function playReaction(reaction) {
    if( reaction === 'victory'){
      const { sound } = await Audio.Sound.createAsync(
         require('./assets/victory.mp3')
      );
      await sound.playAsync(); }
    if( reaction === 'losing'){
      const { sound } = await Audio.Sound.createAsync(
         require('./assets/losing.mp3')
      );
      await sound.playAsync(); }
    if( reaction === 'gameOver'){
      const { sound } = await Audio.Sound.createAsync(
         require('./assets/gameOver.mp3')
      );
      await sound.playAsync(); }
    if( reaction === 'startGame'){
      const { sound } = await Audio.Sound.createAsync(
         require('./assets/game.mp3')
      );
      setMusic(sound)
      await music.playAsync(); }
    if( reaction === 'stopGame'){

      await music.stopAsync(); }
    }

  useEffect(() => {
    async function fetchMyAPI() {
      let data = await Api.newGetPost();
      setPosts(data);
      setPages(Object.keys(data));
    }
    fetchMyAPI();
  }, []);

  if (isFontsLoad && posts && pages) {
    return (
      <>
        <StatusBar
          barStyle={"light-content"}
          animated={true}
        />
        <AppRouter posts={posts} pages={pages} playClick={playClick} playReaction={playReaction} />
      </>
    );
  } else {  
    return (
      <>
        <ActivityIndicator size="small" />
        <AppLoading
          startAsync={fonts}
          onFinish={() => {
            setIsFontsLoad(true);
          }}
          onError={console.warn}
        />
      </>
    );
  }
}

