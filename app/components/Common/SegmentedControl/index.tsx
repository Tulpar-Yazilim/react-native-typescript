import React, {memo, useCallback, useEffect} from 'react';
import {useWindowDimensions} from 'react-native';

import Animated, {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';

import {Block, Text} from '@/components';
import {useTheme} from '@/hooks';
import {COLORS} from '@/theme';
import {widthPixel} from '@/utils';

import {SegmentedControlProps} from './segmented-control';

function SegmentedControl(props: Readonly<SegmentedControlProps>) {
  const {segments, currentIndex, onChange, containerMargin = 10, tabColor, activeColor, titleColor = COLORS.black, activeTitleColor = COLORS.black, width, ...otherProps} = props;

  const theme = useTheme();
  const {width: windowWidth} = useWindowDimensions();

  const marginExtraction = (width ?? windowWidth) - containerMargin * 4;
  const translateValue = marginExtraction / segments.length;
  const tabTranslateValue = useSharedValue(0);

  const memoizedTabPressCallback = useCallback(
    (index: number) => {
      onChange?.(index);
    },
    [onChange],
  );

  //#region Animation
  const DEFAULT_SPRING_CONFIG = {
    stiffness: 250,
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
  }, [currentIndex, tabTranslateValue, translateValue]);
  //#endregion

  return (
    <Block {...otherProps} row wrap style={{backgroundColor: tabColor ?? theme.colors.segmentBar}}>
      {segments?.map((segment, index) => (
        <Block key={`${segment.label}_segment_item`} flex pressable onPress={() => memoizedTabPressCallback(index)}>
          <Block center middle h-50 rounded-10>
            <Text
              medium
              style={{
                color: currentIndex === index ? activeTitleColor : titleColor,
              }}>
              {segment.label}
            </Text>
          </Block>
        </Block>
      ))}
      <Animated.View
        style={[
          animatedStyles,
          {
            width: translateValue,
            backgroundColor: activeColor ?? theme.colors.primary,
            height: 4,
            position: 'absolute',
            bottom: 0,
          },
        ]}
      />
    </Block>
  );
}

export default memo(SegmentedControl);
