import React, {useRef} from "react";
import {fadeIn} from "../utils/fade";
import {BlackText, OrangeCard, StyledImage} from "../src/StyledComponents";
import {Animated, StyleSheet, TouchableOpacity, View,} from "react-native";
import {useRouter} from "expo-router";

const CardItem = ({ item, navigation, isBlacktheme }) => {
  const card = useRef(new Animated.Value(0)).current;
    const router = useRouter();


    return (
    <Animated.View style={{ opacity: card, flex: 1, alignItems: "center" }}>
      <TouchableOpacity
        style={{ width: "100%" }}
        onPress={() => {
            router.push({
                pathname: '/pokemon',
                params: { url: item.item.url, item: JSON.stringify(item.item)},
            })
        }}
      >
        <OrangeCard>
          <View style={styles.textBlock}>
            <BlackText numberOfLines={1}>
              {item.item.name}
            </BlackText>
          </View>
          <View style={styles.textBlock}>
            <StyledImage
              onLoad={() => fadeIn(card)}
              onError={() => fadeIn(card)}
              style={{
                height: 80,
                width: 100,
              }}
              source={{ uri: item.item.front }} />
          </View>
        </OrangeCard>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  buttonBlock: {
    width: "20%",
  },
});

export default CardItem;
