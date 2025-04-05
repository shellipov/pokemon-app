import React from 'react';
import {Animated, Linking, StyleSheet, TouchableOpacity} from 'react-native';
import {GrayBackground, StyledImage} from '@/src/StyledComponents';
import {TextUI} from '@/components/ui/TextUI';

interface IAboutBlockComponentProps {
    opacity?:  Animated.Value
}

export function AboutBlockComponent ({opacity}:IAboutBlockComponentProps) {
  return (
    <Animated.View style={{ opacity: opacity }}>
      <GrayBackground style={styles.littlePadding} >
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('https://pokeapi.co');
          }}
        >
          <TextUI type={'white'} text={'the program is based on'} style={{fontSize: 8}} />
          <StyledImage style={{width: 200, height: 50}} source={require('../../../assets/images/pokeapi.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginTop: 20}}
          onPress={() => {Linking.openURL('https://github.com/shellipov');}}>
          <TextUI type={'white'} text={'Created by shell'} />
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
