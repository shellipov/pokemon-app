import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import CardItem from "./CardItem";
import { mainStyles } from "../styles/styles";
import Api from "../api/api";

export default function Home() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function fetchMyAPI() {
      let data = await Api.getPost();
      setPosts(data);
    }
    fetchMyAPI();
  }, []);

  if (posts) {
    return (
      <View style={styles.titleTextContainer}>
        <Text style={mainStyles.titleFont}>Post List</Text>
        <FlatList
          data={posts}
          renderItem={CardItem}
          keyExtractor={(post) => post.id.toString()}
        />
      </View>
    );
  } else {
    return (
      <>
        <ActivityIndicator size="small" />
      </>
    );
  }
}

const styles = StyleSheet.create({
  titleTextContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
