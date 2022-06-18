/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {characters} from '@api';
import {useApi} from '@hooks';
import {COLORS, SIZES} from '@theme';
import {AppFlatList, AppImage, AppScreen, Block, Text} from '@components';

const FetchDataPage = () => {
  const [data, setData] = useState([]);

  const getCharactersApi = useApi(characters.getCharacters, {
    useAppLoader: true,
  });

  const loadData = async () => {
    const response = await getCharactersApi.request();
    setData(response?.data?.results);
  };

  useEffect(() => {
    loadData();
  }, []);

  const renderItem = ({item}: {item: any}) => {
    return (
      <Block
        mb={10}
        px={10}
        borderRadius={SIZES.radius}
        backgroundColor={COLORS.lightGray}>
        <Block center row>
          <AppImage
            url={item?.image}
            width={40}
            height={40}
            borderRadius={SIZES.radius}
          />
          <Text ml={20}>{item?.name}</Text>
        </Block>
      </Block>
    );
  };

  return (
    <AppScreen>
      <AppFlatList
        data={data}
        ListEmptyComponent={
          <Block pt={20} center middle>
            <Text>No records found.</Text>
          </Block>
        }
        renderItem={renderItem}
      />
    </AppScreen>
  );
};

export default FetchDataPage;
