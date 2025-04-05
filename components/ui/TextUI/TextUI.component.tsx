import React from 'react';
import {StyleProp, StyleSheet, Text, TextStyle, useColorScheme} from 'react-native';
import {TextProps} from 'react-native/Libraries/Text/Text';

export type TextType = 'orange' | 'white' | 'black'

export interface ITextProps extends TextProps{
    type: TextType,
    text?: string | number | undefined,
    onPress?: () => void,
    children?: React.ReactNode,
    style?: StyleProp<TextStyle>,
}

export function TextUI (props: ITextProps) {
  const colorScheme = useColorScheme();
  const isBlackTheme = colorScheme === 'dark';

  const style = props.style || {};
  switch (props.type) {
    case 'orange':
      return (
        <Text
          style={[styles.orange, {textShadowColor: isBlackTheme ? 'white' : 'rgba(0, 0, 0, 0.75)'}, style]}
          onPress={props.onPress}>
          {props.text}
          {props.children}
        </Text>
      );

    case 'white':
      return (
        <Text
          style={[styles.white, {textShadowColor: isBlackTheme ? 'white' : 'rgba(0, 0, 0, 0.75)', color: isBlackTheme ? 'black' : 'white'}, style]}
          onPress={props.onPress} >
          {props.text}
          {props.children}
        </Text>
      );

    case 'black':
      return (
        <Text
          style={[styles.black, style]}
          onPress={props.onPress}>
          {props.text}
          {props.children}
        </Text>
      );
    default:
      return (
        <Text
          style={[styles.default, style]}
          onPress={props.onPress}>
          {props.text}
          {props.children}
        </Text>
      );
  }
}

const styles = StyleSheet.create({
  orange: {
    fontFamily: 'Comix',
    fontSize: 15,
    color: 'orange',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
    padding: 5,
    textAlign: 'center',
  },
  white: {
    fontFamily: 'Comix',
    fontSize: 10,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
    textAlign: 'center',
  },
  black: {
    fontFamily: 'Comix',
    fontSize: 10,
    color: 'black',
    textAlign: 'center',
  },
  default: {
    fontFamily: 'Comix',
    fontSize: 6,
    color: 'black',
    textAlign: 'center',
  }
});

