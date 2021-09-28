import React from "react";
import { mainStyles } from "../styles/styles";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";

const CardItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Pokemon", item.item)}>
      <View style={mainStyles.card}>
        <View style={styles.textBlock}>
          <Text numberOfLines={1} style={mainStyles.comix}>
            {item.item.name}
          </Text>
        </View>

        <View style={styles.buttonBlock}>
          <Button
            title="more"
            
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textBlock: {
    width: "80%",
  },
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
