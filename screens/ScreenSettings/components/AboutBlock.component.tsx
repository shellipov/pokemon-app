import React from 'react';
import {Animated, Linking, StyleSheet, TouchableOpacity} from 'react-native';
import {GrayBackground, StyledImage, WhiteText} from '@/src/StyledComponents';

interface IAboutBlockComponentProps {
    opacity?:  Animated.Value
}

export function AboutBlockComponent({opacity}:IAboutBlockComponentProps) {
  return (
    <Animated.View style={{ opacity: opacity }}>
      <GrayBackground style={styles.littlePadding} >
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('https://pokeapi.co');
          }}
        >
          <WhiteText style={{fontSize: 8}} >{'the program is based on'}</WhiteText>
          <StyledImage style={{width: 200,height: 50}} source={require('../../../assets/images/pokeapi.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginTop: 20}}
          onPress={() => {Linking.openURL('https://github.com/shellipov');}}>
          <WhiteText >{'Created by shell'}</WhiteText>
        </TouchableOpacity>
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
