import React, {useRef} from 'react';
import {fadeIn} from '@/utils/fade';
import {OrangeCard, StyledImage} from '@/src/StyledComponents';
import {Animated, TouchableOpacity, View,} from 'react-native';
import {IPokemonItem} from '@/api/api';
import {useNavigationHook} from '@/hooks/useNavigation';
import {Routes} from '@/src/AppPouter.types';
import {TextUI} from '@/components/ui/TextUI';

export const CardItem = ({ item } : {item : IPokemonItem}) => {
  const card = useRef(new Animated.Value(0)).current;
  const navigation =  useNavigationHook();

  return (
    <Animated.View style={{ opacity: card, flex: 1, alignItems: 'center' }}>
      <TouchableOpacity
        style={{ width: '100%' }}
        onPress={() => {navigation.navigate(Routes.Pokemon, {item: item});}}
      >
        <OrangeCard>
          <View >
            {/*TODO: разобраться с пропсами*/}
            <TextUI type={'black'} text={item.name} numberOfLines={1} style={{overflow: 'hidden'}} />
          </View>
          <View>
            <StyledImage
              onLoad={() => fadeIn(card)}
              onError={() => fadeIn(card)}
              style={{height: 80, width: 100}}
              source={{ uri: item.front }} />
          </View>
        </OrangeCard>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CardItem;
