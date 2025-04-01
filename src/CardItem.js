import React, {useRef} from "react";
import {fadeIn} from "../utils/fade";
import {BlackText, OrangeCard, StyledImage} from "../src/StyledComponents";
import {Animated, StyleSheet, TouchableOpacity, View,} from "react-native";
import {useNavigation} from "@react-navigation/native";

const CardItem = ({ item }) => {
  const card = useRef(new Animated.Value(0)).current;
    const navigation =  useNavigation()


    return (
    <Animated.View style={{ opacity: card, flex: 1, alignItems: "center" }}>
      <TouchableOpacity
        style={{ width: "100%" }}
        onPress={() => {
            navigation.navigate('Pokemon',{ url: item.item.url, item: item.item},
            )
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
