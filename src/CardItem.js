import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const CardItem = ({ item }) => {
  return (
    <View style={styles.card}>
      <View style={styles.textBlock}>
        <Text numberOfLines={1} style={styles.title}>
          {item.title}
        </Text>
        <Text numberOfLines={2} style={styles.body}>
          {item.body}
        </Text>
      </View>

      <View style={styles.buttonBlock}>
        <Button title="more" />
        <Button title="delete" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ccc",
    padding: 6,
    borderRadius: 6,
    margin: 5,
    flexDirection: "row",
    justifyContent: 'space-around'
  },
  textBlock: {
    width: '80%'
  },
  buttonBlock: {
    width: '20%'
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
