import React, {useEffect, useState} from 'react';
import {Alert, Animated, StyleSheet} from 'react-native';
import {GrayBackground} from '@/src/StyledComponents';
import {TextUI} from '@/components/ui/TextUI';
import {clearStatistics, getStorageStatistics} from '@/utils/statistics';
import {ButtonUI} from '@/components/ui/ButtonUI/ButtonUI.component';

interface IStatisticsBlockComponentProps {
    opacity?:  Animated.Value
}

export function StatisticsBlockComponent ({opacity}: IStatisticsBlockComponentProps) {
  const [isNeedToUpdate, setIsNeedToUpdate] = useState(false);
  const [statisticsData, setStatisticsData] = useState({
    totalGamesPlayed: undefined,
    allCorrectAnswers: undefined,
    totalWrongAnswers: undefined,
    maximumPointsPerGame: undefined,
  });

  function clear () {
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
        <TextUI type={'white'} style={{ marginBottom: 20, fontSize: 14 }} text={'Statistics'} />
        <TextUI type={'white'} style={{ marginBottom: 10, fontSize: 8 }} text={'total games played:  '}>
          <TextUI type={'orange'} style={{ fontSize: 12 }} text={statisticsData.totalGamesPlayed} />
        </TextUI>
        <TextUI type={'white'} style={{ marginBottom: 10, fontSize: 8 }} text={'all correct answers:  '}>
          <TextUI type={'orange'} style={{ fontSize: 12 }} text={statisticsData.allCorrectAnswers} />
        </TextUI>
        <TextUI type={'white'} style={{ marginBottom: 10, fontSize: 8 }} text={'total wrong answers:  '}>
          <TextUI type={'orange'} style={{ fontSize: 12 }} text={statisticsData.totalWrongAnswers} />
        </TextUI>
        <TextUI type={'white'} style={{ marginBottom: 10, fontSize: 8 }} text={'maximum points per game:  '}>
          <TextUI type={'orange'} style={{ fontSize: 12 }} text={statisticsData.maximumPointsPerGame} />
        </TextUI>
        <ButtonUI type={'small'} style={{ width: '100%' }} onPress={clear}>
          <TextUI type={'orange'} style={{ fontSize: 10 }} text={'Clear Statistics'} />
        </ButtonUI>
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
