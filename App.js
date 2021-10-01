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
  const [sound, setSound] = useState(null);

  async function playClick() {
    const { sound } = await Audio.Sound.createAsync(
       require('./assets/click.mp3')
    );
    setSound(sound);
    await sound.playAsync(); }

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
        <AppRouter posts={posts} pages={pages} playClick={playClick} />
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

