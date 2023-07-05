import React, {useState} from 'react';

import {useTheme} from '@react-navigation/native';

import {useGetCharactersQuery} from '@/api';
import {AppFlatList, AppImage, AppScreen, Block, Swipeable, Text} from '@/components';
import EmptyList from '@/components/Common/EmptyList';
import {COLORS, SIZES} from '@/theme';

type ItemType = {
  image: string;
  name: string;
};

const FetchDataPage = () => {
  const [page, setPage] = useState(1);
  const {data: characters, isLoading} = useGetCharactersQuery(1);
  const theme = useTheme();

  const retrieveMore = () => {
    setPage(page + 1);
  };

  const renderItem = ({item}: {item: ItemType}) => {
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
          },
        ]}>
        <Block style={{borderWidth: 0.2, backgroundColor: theme.colors.background}} px-10 py-10 br-10 border>
          <Block center row>
            <AppImage url={item.image} width={40} height={40} borderRadius={SIZES.radius} />
            <Text ml-10 black>
              {item.name}
            </Text>
          </Block>
        </Block>
      </Swipeable>
    );
  };

  return (
    <AppScreen title="fetch_data" flatList customStyle={{padding: 0}}>
      <AppFlatList
        onRefreshData={() => console.log('Refreshed')}
        usePagination
        data={characters?.results}
        ListEmptyComponent={<EmptyList text="No records found." />}
        renderItem={renderItem}
        onEndReached={retrieveMore}
        refreshing={isLoading}
      />
    </AppScreen>
  );
};

export default FetchDataPage;
