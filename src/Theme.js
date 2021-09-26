import React, { useEffect } from "react";
import { View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Theme({ isBlackTheme, setIsBlackTheme }) {
  const setIsBlackThemeStorage = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@getIsBlackTheme", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const getIsBlackThemeStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@getIsBlackTheme");
      return jsonValue != null ? JSON.parse(jsonValue) : false;
    } catch (e) {
      console.log(e);
    }
  };

  const changeTheme = () => {
    setIsBlackThemeStorage(!isBlackTheme);
    setIsBlackTheme(!isBlackTheme);
  };

  useEffect(() => {
    async function storeData() {
      try {
        data = await getIsBlackThemeStorage();
        setIsBlackTheme(data);
      } catch (e) {
        console.log(e);
      }
    }
    storeData();
  }, []);

  return (
    <View>
      <Button
        title={isBlackTheme ? "White Theme" : "DarkTheme"}
        onPress={changeTheme}
      />
    </View>
  );
}
