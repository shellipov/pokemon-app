import React, { useRef } from "react";
import { fadeIn } from "../utils/fade";
import { StyledImage, OrangeCard, BlackText } from "../src/StyledComponents";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";

const CardItem = ({ item, navigation, isBlacktheme, playClick }) => {
  const card = useRef(new Animated.Value(0)).current;

  return (
    <Animated.View style={{ opacity: card, flex: 1, alignItems: "center" }}>
      <TouchableOpacity
        style={{ width: "100%" }}
        onPress={() => {
          navigation.navigate("Pokemon", item.item), playClick();
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
              source={{ uri: item.item.front }}
            ></StyledImage>
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
