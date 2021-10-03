import React, { useRef } from "react";
import { mainStyles } from "../styles/styles";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";

const CardItem = ({ item, navigation, isBlacktheme, playClick }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Pokemon", item.item), playClick();
        }}
      >
        <View style={mainStyles.card}>
          <View style={styles.textBlock}>
            <Text numberOfLines={1} style={mainStyles.comix}>
              {item.item.name}
            </Text>
          </View>
          <View style={styles.textBlock}>
            <Image
              onLoad={fadeIn}
              onError={fadeIn}
              style={{
                height: 80,
                width: 100,
                shadowColor: "rgb(41, 41, 41)",
                shadowOffset: {
                  width: 1,
                  height: 1,
                },
                shadowOpacity: 1,
                shadowRadius: 1,
              }}
              source={{ uri: item.item.front }}
            ></Image>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  // textBlock: {
  //   width: "80%",
  // },
  buttonBlock: {
    width: "20%",
  },
  title: {
    color: "green",
    fontSize: 16,
  },
  body: {
    backgroundColor: "#ccc",
  },
});

export default CardItem;
