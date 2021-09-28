import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import CardItem from "./CardItem";
import { mainStyles } from "../styles/styles";
import Api from "../api/api";
import { getPageCount } from "../utils/pages";

export default function PostList({ navigation }) {
  const limit = 25;
  const [posts, setPosts] = useState(null);
  const [offset, setOffset] = useState(0);
  const [pages, setPages] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const scrollRef = useRef();

  useEffect(() => {
    async function fetchMyAPI() {
      let data = await Api.getPost(limit, offset);
      setPosts(data.results);
      const pageNumber = getPageCount(data.count, 30);
      const pageArray = [];
      for (let i = 0; i < pageNumber; i++) {
        pageArray.push(i + 1);
      }
      setPages(pageArray);
    }
    fetchMyAPI();
  }, [offset]);

  if (posts) {
    return (
      <>
        <View style={mainStyles.around}>
          <Text
            onPress={() => navigation.navigate("Search")}
            style={mainStyles.titleFont}
          >
            Search
          </Text>
          <Text
            onPress={() => navigation.navigate("Settings")}
            style={mainStyles.titleFont}
          >
            Settings
          </Text>
          <Text
            onPress={() => navigation.navigate("My")}
            style={mainStyles.titleFont}
          >
            My
          </Text>
        </View>
        <FlatList
          ref={scrollRef}
          data={posts}
          renderItem={(item) => (
            <CardItem item={item} navigation={navigation} />
          )}
          keyExtractor={(post) => post.name}
        />
        <View style={mainStyles.around}>
          <FlatList
            contentContainerStyle={{ alignSelf: "flex-start" }}
            numColumns={60}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={pages}
            renderItem={(pages) => (
              <TouchableOpacity onPress={() =>{
                setOffset(pages.item * limit),
                setPageNumber(pages.item),
                scrollRef.current?.scrollToOffset({
                  animated: true, offset: 0
                })
              }
              }>

              <View style={{...mainStyles.pageButton, ...(pageNumber === pages.item ? {backgroundColor: 'gray'}: {})}}>
                <Text
                  
                  style={mainStyles.pageButtonText}
                >
                  {pages.item}{" "}
                </Text>
              </View>
              </TouchableOpacity>
            )}
            keyExtractor={(post) => post.name}
          />
        </View>
      </>
    );
  } else {
    return (
      <>
        <ActivityIndicator size="small" />
      </>
    );
  }
}
