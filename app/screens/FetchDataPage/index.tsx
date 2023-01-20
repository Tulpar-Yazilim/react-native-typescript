/* eslint-disable react-native/no-inline-styles */
import {useGetCharactersQuery} from '@api';
import {
  AppFlatList,
  AppImage,
  AppScreen,
  Block,
  Swipeable,
  Text,
} from '@components';
import {COLORS, SIZES} from '@theme';
import React from 'react';

const FetchDataPage = () => {
  const {data: characters, isLoading} = useGetCharactersQuery(1);

  const renderItem = ({item}: {item: any}) => {
    return (
      <Swipeable
        leftItems={[
          {
            text: 'Favorite',
            textColor: COLORS.white,
            icon: {
              name: 'home',
              size: 20,
              color: COLORS.white,
            },
            background: '#388e3c',
            onPress: () => console.log('on press'),
          },
        ]}
        rightItems={[
          {
            text: 'Delete',
            textColor: COLORS.white,
            icon: {
              name: 'home',
              size: 20,
              color: COLORS.white,
            },
            background: 'red',
            onPress: () => console.log('on press'),
          },
        ]}>
        <Block
          style={{backgroundColor: 'white', borderWidth: 0.2}}
          px-10
          py-10
          br-10
          border>
          <Block center row>
            <AppImage
              url={item?.image}
              width={40}
              height={40}
              borderRadius={SIZES.radius}
            />
            <Text ml-10 black>
              {item?.name}
            </Text>
          </Block>
        </Block>
      </Swipeable>
    );
  };

  return (
    <AppScreen flatList customStyle={{padding: 0}}>
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
