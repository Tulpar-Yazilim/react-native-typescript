import React, {ReactNode, RefObject} from 'react';
import {ActivityIndicator, FlatListProps, FlatList as FList, ImageStyle, ScrollView, TextStyle, View, ViewStyle} from 'react-native';

import Block from '../Block';

import {COLORS} from '@/theme';

interface IFListProps<T> extends FlatListProps<T> {
  data: ReadonlyArray<T>;
  usePagination?: boolean;
  loading?: boolean;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  refreshing?: boolean;
  onRefresh?: () => void;
  preloader?: ReactNode;
  preloaderLength?: number;
  preloaderWidth?: number;
  preloaderHeight?: number;
  preloaderContainerStyle?: ViewStyle | TextStyle | ImageStyle;
  contentContainerStyle?: ViewStyle | TextStyle | ImageStyle;
  horizontal?: boolean;
  sticky?: boolean;
  index?: number;
  removeClippedSubviews?: boolean;
  flex?: boolean;
  reference?: RefObject<FList>;
}

function FlatList<T>(props: IFListProps<T>) {
  const {
    data,
    renderItem,
    usePagination = false,
    loading,
    onEndReached,
    onEndReachedThreshold = 0.8,
    refreshing,
    onRefresh,
    preloader,
    preloaderLength,
    preloaderWidth,
    preloaderHeight,
    preloaderContainerStyle,
    horizontal = false,
    sticky = false,
    contentContainerStyle,
    removeClippedSubviews = true,
    flex,
    reference,
    ...rest
  } = props;

  const renderFooter = () => {
    if (!loading) {
      return <></>;
    }
    return (
      <Block center middle>
        <ActivityIndicator animating color={COLORS.black} size="large" style={{marginTop: 15, marginBottom: 15}} />
      </Block>
    );
  };

  const PreloaderRenderItem = <Block h={preloaderHeight} w={preloaderWidth} style={[{marginBottom: 10}, preloaderContainerStyle]} />;

  return preloader ? (
    <>
      {horizontal ? (
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} horizontal style={[preloaderContainerStyle]}>
          {[...Array(preloaderLength)]?.map(() => PreloaderRenderItem)}
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
          {[...Array(preloaderLength)]?.map(() => PreloaderRenderItem)}
        </View>
      )}
    </>
  ) : (
    <FList
      ref={reference}
      data={data && data.length > 0 ? data : []}
      renderItem={renderItem}
      ListFooterComponent={usePagination ? renderFooter : null}
      onEndReached={usePagination ? onEndReached : null}
      onEndReachedThreshold={onEndReachedThreshold}
      onRefresh={onRefresh}
      refreshing={refreshing}
      keyExtractor={(_item, index) => 'flat_list_item_' + index}
      contentContainerStyle={contentContainerStyle}
      removeClippedSubviews={removeClippedSubviews}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      horizontal={horizontal}
      stickyHeaderIndices={sticky ? [0] : undefined}
      style={{
        height: flex ? '100%' : 'auto',
      }}
      {...rest}
    />
  );
}

export default FlatList;
