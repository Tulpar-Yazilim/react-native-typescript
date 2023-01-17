import {useGetCharactersQuery} from '@api';
import {AppFlatList, AppImage, AppScreen, Block, Text} from '@components';
import {COLORS, SIZES} from '@theme';
import React from 'react';

const FetchDataPage = () => {
  const {data: characters, isLoading} = useGetCharactersQuery(1);

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
          <Text ml={20} black>
            {' '}
            {item?.name}
          </Text>
        </Block>
      </Block>
    );
  };

  return (
    <AppScreen flatList>
      <AppFlatList
        contentContinerStyle={{flex: 1}}
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
