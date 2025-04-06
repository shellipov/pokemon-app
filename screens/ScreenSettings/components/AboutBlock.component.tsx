import React, { useCallback } from 'react';
import { Animated, Linking, StyleSheet, TouchableOpacity } from 'react-native';
import { GrayBackground, StyledImage } from '@/src/StyledComponents';
import { TextUI } from '@/components/ui/TextUI';

interface IAboutBlockComponentProps {
    opacity?: Animated.Value
}

export function AboutBlockComponent ({ opacity }:IAboutBlockComponentProps) {
  const onGoToPokeapi = useCallback(()=> {
    Linking.openURL('https://pokeapi.co').then();
  }, [Linking]);

  const onGoToAuthor = useCallback(()=> {
    Linking.openURL('https://github.com/shellipov').then();
  }, [Linking]);

  return (
    <Animated.View style={{ opacity }}>
      <GrayBackground style={styles.littlePadding}>
        <TouchableOpacity
          onPress={onGoToPokeapi}>
          <TextUI type={'white'} text={'the program is based on'} style={{ fontSize: 8 }} />
          <StyledImage style={{ width: 200, height: 50 }} source={require('../../../assets/images/pokeapi.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={onGoToAuthor}>
          <TextUI type={'white'} text={'Created by shell'} />
        </TouchableOpacity>
      </GrayBackground>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  littlePadding:{
    paddingVertical: 30,
    margin: 5,
  },
});
