import React, {memo, useEffect} from 'react';
import {useWindowDimensions, ViewStyle} from 'react-native';

import {random} from 'lodash';
import Animated, {AnimatedStyleProp, useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';

import {Block, Text} from '@/components';
import {useTheme} from '@/hooks';
import {COLORS} from '@/theme';
import {widthPixel} from '@/utils';

import {Props} from './segmented-control';

function SegmentedControl({segments, currentIndex, onChange, containerMargin = 10, tabColor, activeColor, titleColor = COLORS.black, activeTitleColor = COLORS.black, width, ...props}: Props) {
  const theme = useTheme();
  const {width: windowWidth} = useWindowDimensions();

  const marginExtraction = (width || windowWidth) - containerMargin * 4;
  const translateValue = marginExtraction / segments.length;
  const tabTranslateValue = useSharedValue(0);

  const memoizedTabPressCallback = React.useCallback(
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
    } as AnimatedStyleProp<ViewStyle>;
  });

  useEffect(() => {
    tabTranslateValue.value = withSpring(widthPixel(currentIndex * (translateValue * 1)), DEFAULT_SPRING_CONFIG);
  }, [currentIndex, tabTranslateValue, translateValue]);
  //#endregion

  return (
    <Block {...props} row wrap style={{backgroundColor: tabColor ?? theme.colors.segmentBar}}>
      {segments?.map((segment, index) => (
        <Block key={`${random(1000)}_segment_item`} flex pressable onPress={() => memoizedTabPressCallback(index)}>
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
