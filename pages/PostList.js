import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import CardItem from "../src/CardItem";
import { mainStyles } from "../styles/styles";
import Api from "../api/api";

export default function PostList({ navigation, isBlacktheme, posts, pages, playClick }) {
  const [detailedPokemons, setDetailedPokemons] = useState(null);
  const [pageNumber, setPageNumber] = useState("a");
  const scrollRef = useRef();

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
        <FlatList
          style={{
            backgroundColor: isBlacktheme ? "rgb(24, 24, 24)" : "white",
          }}
          ref={scrollRef}
          data={detailedPokemons}
          renderItem={(item) => (
            <CardItem
            playClick={playClick}
              item={item}
              navigation={navigation}
              isBlacktheme={isBlacktheme}
            />
          )}
          keyExtractor={(post) => post.name}
        />
        <View
          style={[
            mainStyles.around,
            { backgroundColor: isBlacktheme ? "rgb(24, 24, 24)" : "white" },
          ]}
        >
          <FlatList
            contentContainerStyle={{
              alignSelf: "flex-start",
              backgroundColor: isBlacktheme ? "rgb(24, 24, 24)" : "white",
            }}
            numColumns={60}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={pages}
            renderItem={(pages) => (
              <TouchableOpacity
                onPress={() => {
                  setPageNumber(pages.item),
                    setDetailedPokemons([]),
                    playClick(),
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
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alingItems: "center",
            backgroundColor: isBlacktheme ? "rgb(24, 24, 24)" : "white",
          }}
        >
          <ActivityIndicator size="small" />
        </View>
      </>
    );
  }
}
