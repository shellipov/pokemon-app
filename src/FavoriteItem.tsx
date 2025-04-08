import React, { useEffect } from 'react';
import { fadeIn } from '@/utils/fade';
import { Animated, StyleSheet, View } from 'react-native';
import { GrayBackground, StyledImage } from '@/src/StyledComponents';
import { SoundController } from '@/utils/sounds';
import { TextUI } from '@/components/ui/TextUI';
import { ButtonUI } from '@/components/ui/ButtonUI/ButtonUI.component';
import { IPokemonStorage } from '@/src/service/PokemonStorage';
import { useRefAnimated } from '@/hooks/useRefAnimated';

export interface IFavoriteItemProps {
  item: IPokemonStorage,
  deletePokemon: (id?: string)=> void,
  index: number
}

export const FavoriteItem = ({ item, deletePokemon, index }: IFavoriteItemProps) => {
  const playClick = SoundController.instance.playClick;
  const card = useRefAnimated();
  const image_1 = useRefAnimated();
  const image_2 = useRefAnimated();

  useEffect(() => {
    fadeIn(card, (index * 150));
  }, []);

  return (
    <Animated.View style={{ opacity: card }}>
      <GrayBackground style={{ marginTop: 20, paddingVertical: 10, position: 'relative' }}>
        <TextUI type={'orange'} text={item.name} />
        <ButtonUI
          type={'small'}
          onPress={() => {deletePokemon(item.id); playClick().then();}}
          style={styles.littleButton}>
          <TextUI type={'orange'} text={'del'} style={styles.littleButtonText} />
        </ButtonUI>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Animated.View style={{ opacity: image_1, width: '50%', height: 150 }}>
            <StyledImage onLoad={() => fadeIn(image_1)} source={{ uri: item.img1 }} />
          </Animated.View>
          <Animated.View style={{ opacity: image_2, width: '50%', height: 150 }}>
            <StyledImage onLoad={() => fadeIn(image_2)} source={{ uri: item.img2 }} />
          </Animated.View>
        </View>
      </GrayBackground>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  littleButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  littleButtonText: {
    fontSize: 12,
    padding: 0,
    paddingLeft: 4,
    paddingRight: 3,
    textShadowOffset: { width: -1, height: 1 },
    top: -2,
  },
});
