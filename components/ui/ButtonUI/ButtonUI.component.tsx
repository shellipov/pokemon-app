import React from 'react';
import { StyleProp, useColorScheme, ViewStyle } from 'react-native';
import { ButtonProps } from 'react-native/Libraries/Components/Button';
import { CloseButton, DefaultButton, SmallButton } from '@/src/StyledComponents';

type ButtonType = 'default' | 'small' | 'close'
// @ts-ignore
export interface IButtonUIProps extends ButtonProps{
  type: ButtonType,
  children?: React.ReactNode,
  title?: string,
  active?: boolean
  style?: StyleProp<ViewStyle>
}

export function ButtonUI ({ type, style, active, children, ...rest }: IButtonUIProps) {
  const colorScheme = useColorScheme();
  const isBlackTheme = colorScheme === 'dark';
  const activeStyle = active ? { backgroundColor: 'gray' } : {};

  switch (type) {
    case 'close':
      return (
        <CloseButton style={[{ backgroundColor: isBlackTheme ? 'white' : 'rgba(0, 0, 0, 0.75)' }, style]} {...rest}>
          {children}
        </CloseButton>
      );

    case 'small':
      return (
        <SmallButton
          style={[{ backgroundColor: isBlackTheme ? 'rgba(0, 0, 0, 0.75)' : 'white' }, activeStyle, style]} {...rest}>
          {children}
        </SmallButton>
      );
    default:
      return (
        <DefaultButton
          style={style} {...rest}>
          {children}
        </DefaultButton>
      );
  }
}
