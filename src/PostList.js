import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import CardItem from "./CardItem";
import { mainStyles } from "../styles/styles";
import Api from "../api/api";

export default function PostList({ navigation, isBlacktheme }) {
  const [posts, setPosts] = useState(null);
  const [pages, setPages] = useState([]);
  const [detailedPokemons, setDetailedPokemons] = useState(null);
  const [pageNumber, setPageNumber] = useState("a");

  const scrollRef = useRef();

  useEffect(() => {
    async function fetchMyAPI() {
      let data = await Api.newGetPost();
      setPosts(data);
      setPages(Object.keys(data));
    }
    fetchMyAPI();
  }, []);

  useEffect(() => {
    if (posts && pageNumber) {
      async function fetchMyAPI() {
        const detailedList = await Api.getDetailedList(posts[pageNumber]);
        setDetailedPokemons(detailedList);
      }
      fetchMyAPI();
    }
  }, [posts, pageNumber]);

  if (detailedPokemons) {
    return (
      <>
        <View style={[mainStyles.around, {backgroundColor: isBlacktheme? 'rgb(24, 24, 24)': 'white'}]}>
          {/* <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <Text style={mainStyles.titleFont}>Search</Text>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => navigation.navigate("Favorites")}>
            <Text style={mainStyles.titleFont}>Favorites</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
            <Text style={mainStyles.titleFont}>Settings</Text>
          </TouchableOpacity>
        </View>
        <FlatList
        style={{backgroundColor: isBlacktheme? 'rgb(24, 24, 24)': 'white'}}
          ref={scrollRef}
          data={detailedPokemons}
          renderItem={(item) => (
            <CardItem item={item} navigation={navigation} isBlacktheme={isBlacktheme} />
          )}
          keyExtractor={(post) => post.name}
        />
        <View style={[mainStyles.around, {backgroundColor: isBlacktheme? 'rgb(24, 24, 24)': 'white'}]}> 
          <FlatList
            contentContainerStyle={{ alignSelf: "flex-start", backgroundColor: isBlacktheme? 'rgb(24, 24, 24)': 'white'}}
            numColumns={60}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={pages}
            renderItem={(pages) => (
              <TouchableOpacity
                onPress={() => {
                  setPageNumber(pages.item),
                  setDetailedPokemons([]),
                    scrollRef.current?.scrollToOffset({
                      animated: true,
                      offset: 0,
                    });
                }}
              >
                <View
                  style={{
                    ...mainStyles.pageButton,
                    ...(pageNumber === pages.item
                      ? { backgroundColor: "gray" }
                      : {}),
                  }}
                >
                  <Text style={mainStyles.pageButtonText}>{pages.item} </Text>
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
