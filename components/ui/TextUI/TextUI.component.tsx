import React from 'react';
import {BlackText, DefaultText, OrangeText, WhiteText} from '@/src/StyledComponents';
import {StyleProp, TextStyle, useColorScheme} from 'react-native';

export type TextType = 'orange' | 'white' | 'black'

export interface ITextProps {
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
        <OrangeText
          style={[{textShadowColor: isBlackTheme ? 'white' : 'rgba(0, 0, 0, 0.75)'}, style]}
          onPress={props.onPress}>
          {props.text}
          {props.children}
        </OrangeText>
      );

    case 'white':
      return (
        <WhiteText
          style={[{textShadowColor: isBlackTheme ? 'white' : 'rgba(0, 0, 0, 0.75)', color: isBlackTheme ? 'black' : 'white'}, style]}
          onPress={props.onPress} >
          {props.text}
          {props.children}
        </WhiteText>
      );

    case 'black':
      return (
        <BlackText
          style={style}
          onPress={props.onPress}>
          {props.text}
          {props.children}
        </BlackText>
      );
    default:
      return (
        <DefaultText
          style={style}
          onPress={props.onPress}>
          {props.text}
          {props.children}
        </DefaultText>
      );
  }
}

