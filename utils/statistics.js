import AsyncStorage from "@react-native-async-storage/async-storage";

export const getStorageStatistics = async (setValue) => {
  try {
    const jsonValue1 = await AsyncStorage.getItem("totalGamesPlayed");
    const totalGamesPlayed = jsonValue1 != null ? JSON.parse(jsonValue1) : 0;

    const jsonValue2 = await AsyncStorage.getItem("allCorrectAnswers");
    const allCorrectAnswers = jsonValue2 != null ? JSON.parse(jsonValue2) : 0;

    const jsonValue3 = await AsyncStorage.getItem("totalWrongAnswers");
    const totalWrongAnswers = jsonValue3 != null ? JSON.parse(jsonValue3) : 0;

    const jsonValue4 = await AsyncStorage.getItem("maximumPointsPerGame");
    const maximumPointsPerGame = jsonValue4 != null ? JSON.parse(jsonValue4) : 0;

    setValue({
      totalGamesPlayed,
      allCorrectAnswers,
      totalWrongAnswers,
      maximumPointsPerGame,
    });
  } catch (e) {
    console.log(e);
  }
};

export const setStorageStatisticsPlusValue = async (key) => {
  try {
    const jsonKeyValue = await AsyncStorage.getItem(key);
    let keyValue = jsonKeyValue != null ? JSON.parse(jsonKeyValue) : 0;
    keyValue++;
    await AsyncStorage.setItem(key, JSON.stringify(keyValue++));
  } catch (e) {
    console.log(e);
  }
};

export const setMaximumPointsPerGame = async (newValue) => {
  try {
    const jsonKeyValue = await AsyncStorage.getItem('maximumPointsPerGame');
    let keyValue = jsonKeyValue != null ? JSON.parse(jsonKeyValue) : 0;
    if(keyValue< newValue)
    await AsyncStorage.setItem('maximumPointsPerGame', JSON.stringify(newValue));
  } catch (e) {
    console.log(e);
  }
};

export const clearStatistics = async () => {
  try {
    await AsyncStorage.setItem('totalGamesPlayed', JSON.stringify(0));
    await AsyncStorage.setItem('allCorrectAnswers', JSON.stringify(0));
    await AsyncStorage.setItem('totalWrongAnswers', JSON.stringify(0));
    await AsyncStorage.setItem('maximumPointsPerGame', JSON.stringify(0));
    // await AsyncStorage.clear()
  } catch (e) {
    console.log(e);
  }
};
