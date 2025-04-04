import React, {useEffect} from 'react';
import {Container,} from '@/src/StyledComponents';
import {fadeInFadeOutUtil} from '@/utils/fade';
import {useIsFocused} from '@react-navigation/native';
import {StatisticsBlockComponent} from './components/StatisticsBlock.component';
import {ThemeBlockComponent} from '@/screens/ScreenSettings/components/ThemeBlock.component';
import {useRefAnimated} from '@/hooks/useRefAnimated';
import {AboutBlockComponent} from '@/screens/ScreenSettings/components/AboutBlock.component';
import {SafeAreaView, useColorScheme} from 'react-native';

export function ScreenSettings () {
  const isFocused = useIsFocused();
  const colorScheme = useColorScheme();
  const statisticsBlock = useRefAnimated();
  const themeBlock = useRefAnimated();
  const aboutBlock = useRefAnimated();

  useEffect(() => {
    const buttons = [statisticsBlock, themeBlock, aboutBlock].reverse();
    fadeInFadeOutUtil({items: buttons, isActive: isFocused});
  }, [isFocused]);

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: colorScheme === 'dark' ? 'black' : 'white'}} >
        <Container style={{ justifyContent: 'center' }}>
          <StatisticsBlockComponent opacity={statisticsBlock} />
          <ThemeBlockComponent opacity={statisticsBlock} />
          <AboutBlockComponent opacity={aboutBlock} />
        </Container>
      </SafeAreaView>
    </>
  );
}
