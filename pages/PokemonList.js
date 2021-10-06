import React, { useEffect, useState, useRef } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import CardItem from "../src/CardItem";
import { Container, LittleButton, OrangText } from "../src/StyledComponents";
import { LinearGradient } from "expo-linear-gradient";
import Api from "../api/api";

export default function PokemonList({
  navigation,
  isBlacktheme,
  posts,
  pages,
  playClick,
}) {
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
      <Container isBlacktheme={isBlacktheme} style={{ position: "relative" }}>
        <LinearGradient
          colors={[
            `${isBlacktheme ? "rgb(24, 24, 24)" : "white"}`,
            `${isBlacktheme ? "rgba(0, 0, 0, 0)" : "rgba(255, 255, 255, 0)"}`,
          ]}
          style={{ height: 20, width: "100%", position: "absolute", zIndex: 2 }}
        />
        <FlatList
          style={{ width: "100%", margin: 0, padding: 0 }}
          ref={scrollRef}
          data={detailedPokemons}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(post) => post.name}
          renderItem={(item) => (
            <CardItem
              playClick={playClick}
              item={item}
              navigation={navigation}
              isBlacktheme={isBlacktheme}
            />
          )}
        />
        <View
          style={{
            backgroundColor: isBlacktheme ? "rgb(24, 24, 24)" : "white",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            paddingBottom: 20,
          }}
        >
          <FlatList
            contentContainerStyle={{
              alignSelf: "flex-start",
              justifyContent: "row",
            }}
            numColumns={60}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={pages}
            renderItem={(pages) => (
              <LittleButton
                isBlacktheme={isBlacktheme}
                active={pageNumber === pages.item}
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
                <OrangText style={{ fontSize: 13 }}>{pages.item} </OrangText>
              </LittleButton>
            )}
            keyExtractor={(post) => post.name}
          />
        </View>
      </Container>
    );
  } else {
    return (
      <>
        <Container isBlacktheme={isBlacktheme}>
          <ActivityIndicator size="small" />
        </Container>
      </>
    );
  }
}
