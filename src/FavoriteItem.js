import React, {useEffect, useRef} from 'react';
import {fadeIn} from '@/utils/fade';
import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
import {GrayBackground, OrangText, StyledImage,} from '@/src/StyledComponents';
import {SoundController} from '@/utils/sounds';

const FavoriteItem = ({ item, deletePokemon, index}) => {
  const playClick = SoundController.instance.playClick;
  const card = useRef(new Animated.Value(0)).current;
  const image_1 = useRef(new Animated.Value(0)).current;
  const image_2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeIn(card, (index * 150));
  },[]);

  return (
    <Animated.View style={{ opacity: card}} >
      <GrayBackground
        style={{marginTop: 20, paddingVertical: 10, position: 'relative'}}>
        <OrangText>{item.name}</OrangText>
        <TouchableOpacity
          onPress={() => {deletePokemon(item.id); playClick().then();}}
          style={styles.littleButton}>
          <OrangText style={styles.littleButtonText}>del</OrangText>
        </TouchableOpacity>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Animated.View style={{ opacity: image_1, width: '50%', height: 150 }}>
            <StyledImage onLoad={() => fadeIn(image_1)} source={{uri: item.img1}} />
          </Animated.View>
          <Animated.View style={{ opacity: image_2, width: '50%', height: 150 }}>
            <StyledImage onLoad={() => fadeIn(image_2)} source={{uri: item.img2}}/>
          </Animated.View>
        </View>
      </GrayBackground>
    </Animated.View>
  );
};

export default FavoriteItem;

const styles = StyleSheet.create({
  littleButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    height: 30,
  },
  littleButtonText: {
    paddingBottom: 10,
    fontSize: 12,
    padding: 0,
    paddingLeft: 4,
    paddingRight: 3,
    textShadowOffset: { width: -1, height: 1 },
    top: -4,
  },
});
