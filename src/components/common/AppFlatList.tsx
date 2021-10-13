import React from 'react';
import {ActivityIndicator, FlatList as FList, View} from 'react-native';
import {Block, COLORS} from '@theme';
import {useGuid} from '@hooks';

const FlatList = ({
  data,
  renderItem,
  usePagination = false,
  page,
  loading,
  onEndReached,
  refreshing,
  onRefresh,
  preloader,
  preloaderLength,
  preloaderWidth,
  preloaderHeight,
  preloaderStyle,
  preloaderData,
  preloaderContainerStyle,
  ...props
}: any) => {
  const renderFooter = () => {
    if (!loading) {
      return null;
    }
    return (
      <Block center midle>
        <ActivityIndicator
          animating
          color={COLORS.black}
          size="large"
          style={{marginTop: 15, marginBottom: 15}}
        />
      </Block>
    );
  };

  const PreloaderRenderItem = () => (
    <Block
      key={useGuid()}
      preloader
      noflex
      width={preloaderWidth}
      height={preloaderHeight}
      style={preloaderStyle}
    />
  );

  return preloader ? (
    <View
      style={[
        {
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        },
        preloaderContainerStyle,
      ]}>
      {[...Array(preloaderLength)]?.map((el, index) => (
        <PreloaderRenderItem key={useGuid()} />
      ))}
    </View>
  ) : (
    <FList
      data={data && data.length > 0 ? data : []}
      renderItem={renderItem}
      ListFooterComponent={usePagination ? renderFooter : null}
      onEndReached={usePagination ? onEndReached : null}
      onEndReachedThreshold={0.8}
      onRefresh={onRefresh}
      refreshing={refreshing}
      keyExtractor={() => useGuid()}
      removeClippedSubviews={false}
      {...props}
    />
  );
};

export default FlatList;
