import React, {useRef, useState} from 'react';
import {FlatListProps, ViewToken} from 'react-native';

import {useStyledTag} from '@/hooks';
import {COLORS} from '@/theme';

import {AppFlatList, Block} from '..';

type DataItem = string | object | number;

type DotProps = {
  index?: number;
};

interface AppSwipeCarouselProps<T> extends FlatListProps<T> {
  data: ReadonlyArray<T>;
}

export const AppSwipeCarousel = (props: AppSwipeCarouselProps<DataItem>) => {
  const {renderItem, data} = props;

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Swipe sonrasında current page ' i belirlemek için kullandığımız method.
  const onViewableItemsChanged = ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
    const _currentIndex = viewableItems?.[0]?.index ?? 0;
    setCurrentIndex(_currentIndex);
  };

  // onViewableItemsChanged fonksiyonunun tetiklenme eşiği (swipe anında)
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  // onViewableItemsChanged fonksiyonunun referans dizisi
  const viewabilityConfigCallbackPairs = useRef([{viewabilityConfig, onViewableItemsChanged}]);

  const Dot = useStyledTag(Block, 'rounded-100 w-6 h-6 mr-6 mb-12', ({index}: DotProps) => ({
    backgroundColor: index === currentIndex ? COLORS.white : COLORS.font,
  }));

  return (
    <>
      <AppFlatList renderItem={renderItem} data={data} horizontal pagingEnabled scrollEnabled={data.length > 1} viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current} />
      <Block center row>
        {data.length > 1 && (
          <>
            {data.map((_, index: number) => (
              <Dot key={index} index={index} />
            ))}
          </>
        )}
      </Block>
    </>
  );
};
