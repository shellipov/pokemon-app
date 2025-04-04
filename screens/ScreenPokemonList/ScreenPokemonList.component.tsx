import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, FlatList, ScrollView, View,} from 'react-native';
import {CardItem} from '@/src/CardItem';
import {Container, LittleButton, OrangeText} from '@/src/StyledComponents';
import {LinearGradient} from 'expo-linear-gradient';
import Api, {IPokemonItemShortObject} from '../../api/api';
import {FlatListVars} from '@/utils/FlatList.vars';
import {useTheme} from '@react-navigation/native';

export function ScreenPokemonList () {
  const theme = useTheme();
  const isBlackTheme = theme.dark;
  const [detailedPokemons, setDetailedPokemons] = useState();
  const [posts, setPosts] = useState<IPokemonItemShortObject>();
  const [pages, setPages] = useState([]);
  const [pageNumber, setPageNumber] = useState('a');
  const scrollRef = useRef();


  useEffect(() => {
    async function fetchMyAPI () {
      const data = await Api.newGetPost();
      setPosts(data);
      setPages(Object.keys(data));

    }
    fetchMyAPI();
  }, []);

  useEffect(() => {
    if (!!posts && pageNumber) {
      async function fetchMyAPI () {
        const detailedList = await Api.getDetailedList(posts?.[pageNumber]);
        setDetailedPokemons(detailedList);
      }
      fetchMyAPI();
    }
  }, [posts, pageNumber]);

  if (detailedPokemons) {
    return (
      <Container  style={{ position: 'relative' }}>
        <LinearGradient
          colors={[
            `${isBlackTheme ? 'rgb(24, 24, 24)' : 'white'}`,
            `${isBlackTheme ? 'rgba(0, 0, 0, 0)' : 'rgba(255, 255, 255, 0)'}`,
          ]}
          style={{ height: 20, width: '100%', position: 'absolute', zIndex: 2 }}
        />
        <FlatList
          style={{ width: '100%', margin: 0, padding: 0 }}
          ref={scrollRef}
          data={detailedPokemons}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(post) => post.name}
          {...FlatListVars.performanceOptions}
          renderItem={(item) => (
            <CardItem item={item.item}/>
          )}/>
        <View
          style={{
            backgroundColor: isBlackTheme ? 'rgb(24, 24, 24)' : 'white',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingBottom: 20,
          }}
        >
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {pages.map((item: string) => (
              <LittleButton
                key={item}
                active={pageNumber === item}
                onPress={() => {
                  setPageNumber(item);
                  setDetailedPokemons([]);
                  scrollRef?.current?.scrollToOffset({
                    animated: true,
                    offset: 0,
                  });
                }}
              >
                <OrangeText style={{ fontSize: 13 }}>{item} </OrangeText>
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
