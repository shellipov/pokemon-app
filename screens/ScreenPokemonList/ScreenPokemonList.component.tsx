import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, FlatList, ScrollView, useColorScheme, View,} from 'react-native';
import {CardItem} from '@/src/CardItem';
import {LittleButton} from '@/src/StyledComponents';
import {LinearGradient} from 'expo-linear-gradient';
import Api, {IPokemonItemShortObject} from '../../api/api';
import {FlatListVars} from '@/utils/FlatList.vars';
import {ContainerUI} from '@/components/ui/ContainerUI';
import {TextUI} from '@/components/ui/TextUI';

export function ScreenPokemonList () {
  const colorScheme = useColorScheme();
  const isBlackTheme = colorScheme === 'dark';
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
      <ContainerUI  style={{ position: 'relative' }}>
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
                }}>
                <TextUI type={'orange'} text={item} style={{ fontSize: 13 }}/>
              </LittleButton>
            ))}
          </ScrollView>
        </View>
      </ContainerUI>
    );
  } else {
    return (
      <>
        <ContainerUI>
          <ActivityIndicator size="large" />
        </ContainerUI>
      </>
    );
  }
}
