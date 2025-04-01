import React, { useEffect, useState, useRef } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Platform,
  ScrollView,
} from "react-native";
import CardItem from "../src/CardItem";
import { Container, LittleButton, OrangText } from "../src/StyledComponents";
import { LinearGradient } from "expo-linear-gradient";
import Api from "../api/api";
import {FlatListVars} from "@/utils/FlatList.vars";

export default function PokemonList({
  navigation,
  isBlacktheme,
}) {
  const [detailedPokemons, setDetailedPokemons] = useState(null);
  const [posts, setPosts] = useState();
  const [pages, setPages] = useState([]);
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
      <Container  style={{ position: "relative" }}>
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
          {...FlatListVars.performanceOptions}
          renderItem={(item) => (
            <CardItem
              item={item}
              navigation={navigation}
              isBlacktheme={isBlacktheme}/>
          )}/>
        <View
          style={{
            backgroundColor: isBlacktheme ? "rgb(24, 24, 24)" : "white",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            paddingBottom: 20,
          }}
        >
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {pages.map((item) => (
              <LittleButton
                key={item}
                active={pageNumber === item}
                onPress={() => {
                  setPageNumber(item)
                    setDetailedPokemons([])
                    scrollRef?.current?.scrollToOffset({
                      animated: true,
                      offset: 0,
                    });
                }}
              >
                <OrangText style={{ fontSize: 13 }}>{item} </OrangText>
              </LittleButton>
            ))}
          </ScrollView>
        </View>
      </Container>
    );
  } else {
    return (
      <>
        <Container>
          <ActivityIndicator size="large" />
        </Container>
      </>
    );
  }
}
