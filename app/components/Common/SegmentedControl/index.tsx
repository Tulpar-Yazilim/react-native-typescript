import {Block, Text} from '@/components';
import {useTheme} from '@/hooks';
import React, {memo, useEffect} from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {Props} from './segmented-control';
function SegmentedControl({
  segments,
  currentIndex,
  onChange,
  containerMargin = 10,
  tabColor,
  activeColor,
  ...props
}: Props) {
  const theme = useTheme();
  const {width} = useWindowDimensions();

  const marginExtraction = width - containerMargin * 2;
  const translateValue = marginExtraction / segments.length;
  const tabTranslateValue = useSharedValue(0);

  const memoizedTabPressCallback = React.useCallback(
    (index: number) => {
      onChange(index);
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
    tabTranslateValue.value = withSpring(
      currentIndex * (translateValue * 1),
      DEFAULT_SPRING_CONFIG,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);
  //#endregion

  return (
    <Block
      {...props}
      row
      wrap
      rounded-10
      relative
      style={{backgroundColor: tabColor ?? theme.colors.segmentBar}}>
      <Animated.View
        style={[
          animatedStyles,
          StyleSheet.absoluteFill,
          styles.activeTab,
          {
            width: translateValue - 6,
            backgroundColor: activeColor ?? theme.colors.activeSegment,
          },
        ]}
      />
      {segments?.map((segment: any, index: number) => (
        <Block
          key={index}
          flex
          pressable
          onPress={() => memoizedTabPressCallback(index)}>
          <Block m-4 center middle h-35 rounded-10>
            <Text black>{segment.label}</Text>
          </Block>
        </Block>
      ))}
    </Block>
  );
}

const styles = StyleSheet.create({
  activeTab: {
    backgroundColor: 'red',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    margin: 3,
    borderRadius: 10,
  },
});

export default memo(SegmentedControl);
