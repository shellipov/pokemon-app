import React from 'react';
import { StyleProp, StyleSheet, useColorScheme, View, ViewStyle } from 'react-native';

export interface IContainerUiProps {
    style?: StyleProp<ViewStyle>
    children?: React.ReactNode,
}

export function ContainerUI ({ style, children, ...rest }: IContainerUiProps) {
  const colorScheme = useColorScheme();
  const isBlackTheme = colorScheme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isBlackTheme ? 'rgb(24, 24, 24)' : 'white' }, style]} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

