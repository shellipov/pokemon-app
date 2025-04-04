import React, {useEffect, useState} from 'react';
import {Alert, Animated, StyleSheet} from 'react-native';
import {GrayBackground, LittleButton} from '@/src/StyledComponents';
import {Text} from '@/components/ui/Text';
import {clearStatistics, getStorageStatistics} from '@/utils/statistics';

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
        <Text type={'white'} style={{ marginBottom: 20, fontSize: 14 }} text={'Statistics'} />
        <Text type={'white'} style={{ marginBottom: 10, fontSize: 8 }} text={'total games played:  '}>
          <Text type={'orange'} style={{ fontSize: 12 }} text={statisticsData.totalGamesPlayed} />
        </Text>
        <Text type={'white'} style={{ marginBottom: 10, fontSize: 8 }} text={'all correct answers:  '}>
          <Text type={'orange'} style={{ fontSize: 12 }} text={statisticsData.allCorrectAnswers} />
        </Text>
        <Text type={'white'} style={{ marginBottom: 10, fontSize: 8 }} text={'total wrong answers:  '}>
          <Text type={'orange'} style={{ fontSize: 12 }} text={statisticsData.totalWrongAnswers} />
        </Text>
        <Text type={'white'} style={{ marginBottom: 10, fontSize: 8 }} text={'maximum points per game:  '}>
          <Text type={'orange'} style={{ fontSize: 12 }} text={statisticsData.maximumPointsPerGame} />
        </Text>
        <LittleButton style={{ width: '100%' }}>
          <Text type={'orange'} onPress={clear} style={{ fontSize: 10 }} text={'Clear Statistics'} />
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
