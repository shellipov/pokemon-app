import React from "react";
import { View, Text,  StyleSheet } from "react-native";
import { Link } from "react-router-native";
import { mainStyles } from '../styles/styles'

export default function Nav() {
  return (
    <View style={styles.nav}>
      <Link to="/" underlayColor="#f0f4f7">
        <Text style={mainStyles.link}>Home</Text>
      </Link>
      <Link to="/about" underlayColor="#f0f4f7">
        <Text style={mainStyles.link}>About</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    height: 35,
    alignItems: "flex-end",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  navItem: {
    color: "red",
    fontSize: 20,
    padding: 4,
  },
});
