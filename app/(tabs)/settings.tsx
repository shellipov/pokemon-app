import React, { useEffect, useState } from "react";
import { Switch, Alert, TouchableOpacity, Linking, StyleSheet } from "react-native";
import {
  Container,
  GrayBackground,
  WhiteText,
  OrangText,
  LittleButton,
  StyledImage,
} from "@/src/StyledComponents";
import { getStorageStatistics, clearStatistics } from "@/utils/statistics";

export default function Settings({ isBlacktheme, setIsBlacktheme }) {
  const [isNeedToUpdate, setIsNeedToUpdate] = useState(false);
  const [statisticsData, setStatisticsData] = useState({
    totalGamesPlayed: null,
    allCorrectAnswers: null,
    totalWrongAnswers: null,
    maximumPointsPerGame: null,
  });

  const toggleSwitch = () => setIsBlacktheme(!isBlacktheme);

  function clear() {
    Alert.alert("Are you sure you want cleat statistics", "Maybe not ?", [
      {
        text: "Yes",
        onPress: () => {
          clearStatistics();
          setIsNeedToUpdate(!isNeedToUpdate);
        },
      },
      {
        text: "No",
      },
    ]);
  }

  useEffect(() => {
    getStorageStatistics(setStatisticsData);
  }, [isNeedToUpdate]);

  return (
    <>
      <Container
        isBlacktheme={isBlacktheme}
        style={{ justifyContent: "center" }}
      >
        <GrayBackground style={styles.littlePadding} >
          <WhiteText
            isBlacktheme={isBlacktheme}
            style={{ marginBottom: 20, fontSize: 14 }}
          >
            Statistics
          </WhiteText>
          <WhiteText
            isBlacktheme={isBlacktheme}
            style={{ marginBottom: 10, fontSize: 8 }}
          >
            total games played:
            {"  "}
            <OrangText style={{ fontSize: 12 }}>
              {statisticsData.totalGamesPlayed}
            </OrangText>
          </WhiteText>
          <WhiteText
            isBlacktheme={isBlacktheme}
            style={{ marginBottom: 10, fontSize: 8 }}
          >
            all correct answers:
            {"  "}
            <OrangText style={{ fontSize: 12 }}>
              {statisticsData.allCorrectAnswers}
            </OrangText>
          </WhiteText>
          <WhiteText
            isBlacktheme={isBlacktheme}
            style={{ marginBottom: 10, fontSize: 8 }}
          >
            total wrong answers:
            {"  "}
            <OrangText style={{ fontSize: 12 }}>
              {statisticsData.totalWrongAnswers}
            </OrangText>
          </WhiteText>
          <WhiteText
            isBlacktheme={isBlacktheme}
            style={{ marginBottom: 10, fontSize: 8 }}
          >
            maximum points per game:
            {"  "}
            <OrangText style={{ fontSize: 12 }}>
              {statisticsData.maximumPointsPerGame}
            </OrangText>
          </WhiteText>
          <LittleButton isBlacktheme={isBlacktheme} style={{ width: "100%" }}>
            <OrangText onPress={clear} style={{ fontSize: 10 }}>
              Clear Statistics
            </OrangText>
          </LittleButton>
        </GrayBackground>

        <GrayBackground style={styles.littlePadding}>
          <WhiteText
            isBlacktheme={isBlacktheme}
            style={{ marginBottom: 20, fontSize: 14 }}
          >
            Take a dark theme
          </WhiteText>
          <Switch
            trackColor={{ false: "black", true: "black" }}
            thumbColor={isBlacktheme ? "orange" : "white"}
            ios_backgroundColor="black"
            onValueChange={toggleSwitch}
            value={isBlacktheme}
          />
        </GrayBackground>

        <GrayBackground style={styles.littlePadding}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL("https://pokeapi.co");
            }}
          >
            <WhiteText style={{fontSize: 8}} isBlacktheme={isBlacktheme}>the program is based on</WhiteText>
            <StyledImage style={{width: 200,height: 50}} source={require('../../assets/images/pokeapi.png')}></StyledImage>
          </TouchableOpacity>
          <TouchableOpacity
          style={{marginTop: 20}}
            onPress={() => {
              Linking.openURL("https://github.com/shellipov");
            }}
          >
            <WhiteText isBlacktheme={isBlacktheme}>Created by shell</WhiteText>
          </TouchableOpacity>
        </GrayBackground>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  littlePadding:{
    paddingVertical: 30,
    margin: 5
  }
})
