import React from "react";

import { Text, StyleSheet } from "react-native";

export default function Settings() {
  return (
    <>
      <Text style={styles.about}> Sometimes i can</Text>
      
    </>
  );
}

const styles = StyleSheet.create({
  about: {
    color: "green",
  },
});
