import React from 'react';
import {Animated, Appearance, StyleSheet, Switch, useColorScheme} from 'react-native';
import {GrayBackground} from '@/src/StyledComponents';
import {TextUI} from '@/components/ui/TextUI';

interface IThemeBlockComponentProps {
    opacity?:  Animated.Value
}

export function ThemeBlockComponent ({opacity}:IThemeBlockComponentProps) {
  const colorScheme = useColorScheme();

  const toggleTheme = () => {
    const newTheme = colorScheme === 'dark' ? 'light' : 'dark';
    Appearance.setColorScheme(newTheme); // Принудительно меняет тему
  };

  return (
    <Animated.View style={{ opacity: opacity }}>
      <GrayBackground style={styles.littlePadding} >
        <TextUI type={'white'} text={'Take a dark theme'} style={{ marginBottom: 20, fontSize: 14 }}/>
        <Switch
          trackColor={{ false: 'black', true: 'black' }}
          thumbColor={'orange'}
          ios_backgroundColor="black"
          onValueChange={toggleTheme}
          value={colorScheme === 'dark'}
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

