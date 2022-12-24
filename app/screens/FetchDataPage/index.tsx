import React, {useEffect, useState} from 'react';
import {useGetCharactersQuery} from '@api';
import {useApi} from '@hooks';
import {COLORS, SIZES} from '@theme';
import {AppFlatList, AppImage, AppScreen, Block, Text} from '@components';

const FetchDataPage = () => {
  // const [data, setData] = useState([]);

  const {data: characters, isLoading} = useGetCharactersQuery(1);

  // const getCharactersApi = useApi(characters.getCharacters, {
  //   useAppLoader: true,
  // });

  // const loadData = async () => {
  //   const response = await getCharactersApi.request();
  //   setData(response?.data?.results);
  // };

  // useEffect(() => {
  //   loadData();
  // }, []);

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
    <AppScreen isLoading={isLoading}>
      <AppFlatList
        data={characters?.results}
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
