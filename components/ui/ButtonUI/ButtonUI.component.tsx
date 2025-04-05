import React from 'react';
import {StyleProp, useColorScheme, ViewStyle} from 'react-native';
import {ButtonProps} from 'react-native/Libraries/Components/Button';
import {CloseButton, DefaultButton, SmallButton} from '@/src/StyledComponents';

type ButtonType = 'default' | 'small' | 'close'
// @ts-ignore
export interface IButtonUIProps extends ButtonProps{
  type: ButtonType,
  children?: React.ReactNode,
  title?: string,
  active?: boolean
  style?: StyleProp<ViewStyle>
  disabled?: boolean
}

export function ButtonUI (props: IButtonUIProps) {
  const colorScheme = useColorScheme();
  const isBlackTheme = colorScheme === 'dark';
  const activeStyle = props.active ? { backgroundColor: 'gray'} : {};
  const style = props.style || {};

  switch (props.type) {
    case 'close':
      return (
        <CloseButton
          style={[{backgroundColor: isBlackTheme ? 'white' : 'rgba(0, 0, 0, 0.75)'}, style]}
          disabled={props.disabled}
          onPress={props.onPress}>
          {props.children}
        </CloseButton>
      );

    case 'small':
      return (
        <SmallButton
          style={[{backgroundColor: isBlackTheme ? 'rgba(0, 0, 0, 0.75)' : 'white'}, activeStyle, style]}
          disabled={props.disabled}
          onPress={props.onPress} >
          {props.children}
        </SmallButton>
      );
    default:
      return (
        <DefaultButton
          style={style}
          disabled={props.disabled}
          onPress={props.onPress}>
          {props.children}
        </DefaultButton>
      );
  }
}
