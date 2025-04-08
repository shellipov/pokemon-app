import React from 'react';
import { fadeIn } from '@/utils/fade';
import { OrangeCard, StyledImage } from '@/src/StyledComponents';
import { Animated, TouchableOpacity, View } from 'react-native';
import { IPokemonItem } from '@/api/api';
import { useNavigationHook } from '@/hooks/useNavigation';
import { TextUI } from '@/components/ui/TextUI';
import { useRefAnimated } from '@/hooks/useRefAnimated';

export const CardItem = ({ item } : {item : IPokemonItem}) => {
  const card = useRefAnimated();
  const navigation = useNavigationHook();

  return (
    <Animated.View style={{ opacity: card, flex: 1, alignItems: 'center' }}>
      <TouchableOpacity
        style={{ width: '100%' }}
        onPress={() => {navigation.navigate('Pokemon', { item });}}>
        <OrangeCard>
          <View>
            {/* TODO: разобраться с пропсами */}
            <TextUI type={'black'} text={item.name} numberOfLines={1} style={{ overflow: 'hidden' }} />
          </View>
          <View>
            <StyledImage
              onLoad={() => fadeIn(card)}
              onError={() => fadeIn(card)}
              style={{ height: 80, width: 100 }}
              source={{ uri: item.front }} />
          </View>
        </OrangeCard>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CardItem;
