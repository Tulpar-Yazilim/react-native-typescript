/* eslint-disable react-native/no-inline-styles */
import React, {memo} from 'react';
import {
  ActivityIndicator,
  FlatList as FList,
  View,
  ScrollView,
} from 'react-native';
import {COLORS} from '@theme';
import Block from '../Block';

const FlatList = ({
  data,
  renderItem,
  usePagination = false,
  loading,
  onEndReached,
  refreshing,
  onRefresh,
  preloader,
  preloaderLength,
  preloaderWidth,
  preloaderHeight,
  preloaderStyle,
  preloaderContainerStyle,
  horizontal = false,
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
      preloader
      height={preloaderHeight}
      width={preloaderWidth}
      preloaderStyle={preloaderStyle}
      style={[{marginBottom: 10}, preloaderContainerStyle]}
    />
  );

  return preloader ? (
    <>
      {horizontal ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal
          style={[preloaderContainerStyle]}>
          {[...Array(preloaderLength)]?.map((item, index) => (
            <PreloaderRenderItem key={'preloader_item_' + index} />
          ))}
        </ScrollView>
      ) : (
        <View
          style={[
            {
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
            },
            preloaderContainerStyle,
          ]}>
          {[...Array(preloaderLength)]?.map((item, index) => (
            <PreloaderRenderItem key={'preloader_item_' + index} />
          ))}
        </View>
      )}
    </>
  ) : (
    <FList
      data={data && data.length > 0 ? data : []}
      renderItem={renderItem}
      ListFooterComponent={usePagination ? renderFooter : null}
      onEndReached={usePagination ? onEndReached : null}
      onEndReachedThreshold={0.8}
      onRefresh={onRefresh}
      refreshing={refreshing}
      keyExtractor={(_item, index) => 'flat_list_item_' + index}
      removeClippedSubviews
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      horizontal={horizontal}
      {...props}
    />
  );
};

export default memo(FlatList);
