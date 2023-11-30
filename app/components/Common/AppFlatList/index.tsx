import React, {useState} from 'react';
import {ActivityIndicator, FlatList as FList, RefreshControl, ScrollView} from 'react-native';

import {useThemeMode} from '@/hooks';
import {COLORS} from '@/theme';

import {IFListProps} from './app-flatlist';
import Block from '../Block';

function FlatList<T>(props: IFListProps<T>) {
  const {
    data,
    renderItem,
    usePagination = false,
    loading,
    onEndReached,
    onEndReachedThreshold = 0.8,
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
    onRefreshData,
    ...rest
  } = props;

  const themeMode = useThemeMode();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await onRefreshData?.();
    setRefreshing(false);
  };

  const renderFooter = () => {
    if (!loading) {
      return <></>;
    }
    return (
      <Block center middle py-15>
        <ActivityIndicator animating color={themeMode === 'light' ? COLORS.black : COLORS.white} size="large" />
      </Block>
    );
  };

  const PreloaderRenderItem = <Block h={preloaderHeight} w={preloaderWidth} style={[{marginBottom: 10}, preloaderContainerStyle]} />;

  return preloader ? (
    <React.Fragment>
      {horizontal ? (
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} horizontal style={preloaderContainerStyle}>
          {[...Array(preloaderLength)]?.map(() => PreloaderRenderItem)}
        </ScrollView>
      ) : (
        <Block row wrap center style={preloaderContainerStyle}>
          {[...Array(preloaderLength)]?.map(() => PreloaderRenderItem)}
        </Block>
      )}
    </React.Fragment>
  ) : (
    <FList
      ref={reference}
      data={data ?? []}
      renderItem={renderItem}
      ListFooterComponent={usePagination ? renderFooter : null}
      onEndReached={usePagination ? onEndReached : null}
      onEndReachedThreshold={onEndReachedThreshold}
      refreshControl={onRefreshData ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> : undefined}
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
