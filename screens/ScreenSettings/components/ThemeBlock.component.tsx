import React, { useCallback } from 'react';
import { Animated, Appearance, StyleSheet, Switch, useColorScheme } from 'react-native';
import { GrayBackground } from '@/src/StyledComponents';
import { TextUI } from '@/components/ui/TextUI';

interface IThemeBlockComponentProps {
    opacity?: Animated.Value
}

export function ThemeBlockComponent ({ opacity }:IThemeBlockComponentProps) {
  const colorScheme = useColorScheme();

  const onToggleTheme = useCallback(() => {
    const newTheme = colorScheme === 'dark' ? 'light' : 'dark';
    Appearance.setColorScheme(newTheme); // Принудительно меняет тему
  }, [colorScheme]);

  return (
    <Animated.View style={{ opacity }}>
      <GrayBackground style={styles.background}>
        <TextUI type={'white'} text={'Take a dark theme'} style={styles.text} />
        <Switch
          trackColor={{ false: 'black', true: 'black' }}
          thumbColor={'orange'}
          ios_backgroundColor="black"
          onValueChange={onToggleTheme}
          value={colorScheme === 'dark'} />
      </GrayBackground>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  background:{
    paddingVertical: 30,
    margin: 5,
  },
  text:{
    marginBottom: 20,
    fontSize: 14 },
});

