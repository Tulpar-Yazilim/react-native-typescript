/* eslint-disable react-native/no-inline-styles */
import {Block, Text} from '@components';
import {useTheme} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {widthPercentageToDP} from 'react-native-responsive-screen';

function SegmentedControl({
  segments,
  currentIndex,
  setActiveTab,
  ...props
}: any) {
  const containerMargin = 10;
  const theme = useTheme();
  const width = widthPercentageToDP('100%') - containerMargin * 2;
  const translateValue = width / segments.length;
  const tabTranslateValue = useSharedValue(0);

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
    <Block bg-primary {...props} row wrap rounded-10 relative>
      <Animated.View
        style={[
          animatedStyles,
          StyleSheet.absoluteFill,
          styles.activeTab,
          {
            width: translateValue,
            backgroundColor: theme.colors.primary,
          },
        ]}
      />
      {segments?.map((segment: any, index: number) => (
        <Block key={index} flex pressable onPress={() => setActiveTab(index)}>
          <Block
            /* style={activeTab === index ? {backgroundColor: 'red'} : {}} */
            m-4
            center
            middle
            h-35
            rounded-10>
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
    height: '100%',
    borderRadius: 10,
  },
});

export default SegmentedControl;
