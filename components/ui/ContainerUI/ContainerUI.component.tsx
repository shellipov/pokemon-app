import React from 'react';
import {StyleProp, useColorScheme, ViewStyle} from 'react-native';
import {Container} from '@/src/StyledComponents';

export interface IContainerUiProps {
    style?: StyleProp<ViewStyle>
    children?: React.ReactNode,
}


export function ContainerUI (props: IContainerUiProps) {
  const colorScheme = useColorScheme();
  const isBlackTheme = colorScheme === 'dark';
  const style = props.style || {};

  return (
    <Container style={[{backgroundColor: isBlackTheme ? 'rgb(24, 24, 24)' : 'white' }, style]}>
      {props.children}
    </Container>
  );
}
