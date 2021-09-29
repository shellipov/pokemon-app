import React, { useState } from "react";
import AppRouter from "./src/AppRouter";
import AppLoading from "expo-app-loading";
import Theme from "./src/Theme";
import { fonts } from "./styles/styles";

import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from "react-native";

export default function App() {
  const [isBlackTheme, setIsBlackTheme] = useState(true);
  const [isFontsLoad, setIsFontsLoad] = useState(false);

  if (isFontsLoad) {
    return (
      <>
        <StatusBar
          barStyle={isBlackTheme ? "light-content" : "dark-content"}
          animated={true}
        />
  
        <AppRouter isBlackTheme={isBlackTheme} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blackTheme: {
    backgroundColor: "black",
    color: "white",
  },
  whiteTheme: {
    backgroundColor: "white",
    color: "black",
  },
  app: {
    padding: 10,
  },
});
