import React, {useEffect, useState} from 'react';
import {Alert, Animated, StyleSheet} from 'react-native';
import {GrayBackground, LittleButton, OrangText, WhiteText} from '@/src/StyledComponents';
import {clearStatistics, getStorageStatistics} from '@/utils/statistics';

interface IStatisticsBlockComponentProps {
    opacity?:  Animated.Value
}

export function StatisticsBlockComponent({opacity}: IStatisticsBlockComponentProps) {
  const [isNeedToUpdate, setIsNeedToUpdate] = useState(false);
  const [statisticsData, setStatisticsData] = useState({
    totalGamesPlayed: null,
    allCorrectAnswers: null,
    totalWrongAnswers: null,
    maximumPointsPerGame: null,
  });

  function clear() {
    Alert.alert('Are you sure you want cleat statistics', 'Maybe not ?', [
      {
        text: 'Yes',
        onPress: () => {
          clearStatistics().then();
          setIsNeedToUpdate(!isNeedToUpdate);
        },
      },
      {
        text: 'No',
      },
    ]);
  }

  useEffect(() => {
    getStorageStatistics(setStatisticsData).then();
  }, [isNeedToUpdate]);

  return (
    <Animated.View style={{ opacity: opacity }}>
      <GrayBackground style={styles.littlePadding} >
        <WhiteText style={{ marginBottom: 20, fontSize: 14 }}>
          {'Statistics'}
        </WhiteText>
        <WhiteText style={{ marginBottom: 10, fontSize: 8 }}>
          {'total games played:  '}
          <OrangText style={{ fontSize: 12 }}>
            {statisticsData.totalGamesPlayed}
          </OrangText>
        </WhiteText>
        <WhiteText
          style={{ marginBottom: 10, fontSize: 8 }}>
          {'all correct answers:  '}
          <OrangText style={{ fontSize: 12 }}>
            {statisticsData.allCorrectAnswers}
          </OrangText>
        </WhiteText>
        <WhiteText style={{ marginBottom: 10, fontSize: 8 }}>
          {'total wrong answers:  '}
          <OrangText style={{ fontSize: 12 }}>
            {statisticsData.totalWrongAnswers}
          </OrangText>
        </WhiteText>
        <WhiteText style={{ marginBottom: 10, fontSize: 8 }}>
          {'maximum points per game:  '}
          <OrangText style={{ fontSize: 12 }}>
            {statisticsData.maximumPointsPerGame}
          </OrangText>
        </WhiteText>
        <LittleButton style={{ width: '100%' }}>
          <OrangText onPress={clear} style={{ fontSize: 10 }}>
            {'Clear Statistics'}
          </OrangText>
        </LittleButton>
      </GrayBackground>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  littlePadding:{
    paddingVertical: 30,
    margin: 5
  }
});
