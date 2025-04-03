import React from 'react';
import {Animated, StyleSheet, Switch} from 'react-native';
import {GrayBackground, WhiteText} from '@/src/StyledComponents';

interface IThemeBlockComponentProps {
    opacity?:  Animated.Value
}

export function ThemeBlockComponent ({opacity}:IThemeBlockComponentProps) {
  const toggleSwitch = () => {};

  return (
    <Animated.View style={{ opacity: opacity }}>
      <GrayBackground style={styles.littlePadding} >
        <WhiteText style={{ marginBottom: 20, fontSize: 14 }}>
          {'Take a dark theme'}
        </WhiteText>
        <Switch
          trackColor={{ false: 'black', true: 'black' }}
          thumbColor={'orange'}
          ios_backgroundColor="black"
          onValueChange={toggleSwitch}
          value={false}
        />
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

