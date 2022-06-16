/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {characters} from '@api';
import {useApi} from '@hooks';
import {Block, COLORS, SIZES, Text} from '@theme';
import {AppFlatList, AppImage, AppScreen} from '@components';

const DetailPage = () => {
  const [data, setData] = useState([]);
  const getCharactersApi = useApi(characters.getCharacters);

  const loadData = async () => {
    const response = await getCharactersApi.request();
    setData(response.data?.results);
  };

  useEffect(() => {
    loadData();
  }, []);

  const renderItem = (character: any) => {
    return (
      <Block
        mb={10}
        p={[10, 10]}
        borderRadius={SIZES.radius}
        backgroundColor={COLORS.lightGray}>
        <Block center row>
          <AppImage
            url={character.image}
            width={40}
            height={40}
            borderRadius={SIZES.radius}
          />
          <Text ml={20}>{character.name}</Text>
        </Block>
      </Block>
    );
  };

  return (
    <AppScreen scroll>
      <Block flex pt={10} px={20}>
        <AppFlatList
          data={data}
          ListEmptyComponent={
            <Block marginTop={20} center middle>
              <Text>No records found.</Text>
            </Block>
          }
          renderItem={({item}: {item: any}) => renderItem(item)}
        />
      </Block>
    </AppScreen>
  );
};

export default DetailPage;
