import React, {memo, useEffect} from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';

import {random} from 'lodash';
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';

import {Props} from './segmented-control';

import {Block, Text} from '@/components';
import {useTheme} from '@/hooks';
import {COLORS} from '@/theme';
import {widthPixel} from '@/utils';

function SegmentedControl({segments, currentIndex, onChange, containerMargin = 10, tabColor, activeColor, titleColor = COLORS.black, activeTitleColor = COLORS.black, width, ...props}: Props) {
  const theme = useTheme();
  const {width: windowWidth} = useWindowDimensions();

  const marginExtraction = (width || windowWidth) - containerMargin * 2;
  const translateValue = marginExtraction / segments.length;
  const tabTranslateValue = useSharedValue(0);

  const memoizedTabPressCallback = React.useCallback(
    (index: number) => {
      onChange && onChange(index);
    },
    [onChange],
  );

  //#region Animation
  const DEFAULT_SPRING_CONFIG = {
    stiffness: 150,
    damping: 20,
    mass: 1,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: tabTranslateValue.value}],
    };
  });

  useEffect(() => {
    tabTranslateValue.value = withSpring(widthPixel(currentIndex * (translateValue * 1)), DEFAULT_SPRING_CONFIG);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);
  //#endregion

  return (
    <Block {...props} row wrap rounded-10 relative style={{backgroundColor: tabColor ?? theme.colors.segmentBar}}>
      <Animated.View
        style={[
          animatedStyles,
          StyleSheet.absoluteFill,
          styles.activeTab,
          {
            width: translateValue,
            backgroundColor: activeColor ?? theme.colors.activeSegment,
          },
        ]}
      />
      {segments?.map((segment, index) => (
        <Block key={`${random(1000)}_segment_item`} flex pressable onPress={() => memoizedTabPressCallback(index)}>
          <Block center middle h-35 rounded-10>
            <Text
              semiBold
              styles={{
                color: currentIndex === index ? activeTitleColor : titleColor,
              }}>
              {segment.label}
            </Text>
          </Block>
        </Block>
      ))}
    </Block>
  );
}

const styles = StyleSheet.create({
  activeTab: {
    left: 0,
    right: 10,
    bottom: 0,
    top: 0,
    borderRadius: 10,
  },
});

export default memo(SegmentedControl);
