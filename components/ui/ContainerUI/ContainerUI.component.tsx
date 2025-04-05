import React from 'react';
import {StyleProp, StyleSheet, useColorScheme, View, ViewStyle} from 'react-native';

export interface IContainerUiProps {
    style?: StyleProp<ViewStyle>
    children?: React.ReactNode,
}

export function ContainerUI (props: IContainerUiProps) {
  const colorScheme = useColorScheme();
  const isBlackTheme = colorScheme === 'dark';
  const style = props.style || {};

  return (
    <View style={[styles.container, {backgroundColor: isBlackTheme ? 'rgb(24, 24, 24)' : 'white' }, style]}>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  }
});

