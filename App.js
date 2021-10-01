import React, { useState, useEffect } from "react";
import AppRouter from "./src/AppRouter";
import AppLoading from "expo-app-loading";
import Api from "./api/api";
import { fonts } from "./styles/styles";

import {
  StatusBar,
  ActivityIndicator,
} from "react-native";

export default function App() {
  const [isFontsLoad, setIsFontsLoad] = useState(false);
  const [posts, setPosts] = useState(null);
  const [pages, setPages] = useState([]);

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
        <AppRouter posts={posts} pages={pages} />
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

