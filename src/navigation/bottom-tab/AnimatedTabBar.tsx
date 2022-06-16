import React from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  interpolate,
  Extrapolate,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Svg, {Path} from 'react-native-svg';
//@ts-ignore
import * as shape from 'd3-shape';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {useNavigation} from '@react-navigation/native';
import {BottomTabItemList} from './_BottomTabItemList';
import {bottomTabHeight, COLORS} from '@theme';

const {width} = Dimensions.get('window');

const tabs = BottomTabItemList;

const tabWidth = width / tabs.length;

const getPath = () => {
  const tab = shape.line().curve(shape.curveBasis)([
    [0, 0],
    [tabWidth / 4, 0],
    [tabWidth / 2, 8],
    [tabWidth, 80],
    [(tabWidth / 2) * 3, 8],
    [(tabWidth / 4) * 7, 0],
    [tabWidth * 2, 0],
  ]);
  return `${tab}`;
};
const d = getPath();

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: bottomTabHeight,
    zIndex: 2,
  },
  activeIcon: {
    backgroundColor: 'transparent',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type ButtonProps = {
  item: IconProp;
  index: number;
  activeIndex: Animated.SharedValue<number>;
  width: number;
  position: number;
  label: string;
  readonly indicatorPosition: Animated.SharedValue<number>;
};

function Button({
  item,
  index,
  activeIndex,
  width,
  label,
  position,
  indicatorPosition,
}: ButtonProps) {
  const staticIconStyle = useAnimatedStyle(() => {
    const visibility = interpolate(
      indicatorPosition.value,
      [
        position - width / 2,
        position - width / 8,
        position + width / 8,
        position + width / 2,
      ],
      [1, 0, 0, 1],
      Extrapolate.CLAMP,
    );
    return {
      opacity: visibility,
      transform: [{translateY: 10 * (1 - visibility)}],
    };
  });

  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        activeIndex.value = index;
        navigation.navigate(label);
      }}>
      <View style={styles.tab}>
        <Animated.View style={staticIconStyle}>
          <FontAwesomeIcon icon={item} color="white" size={25} />
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}

type ActiveIconProps = {
  item: IconProp;
  index: number;
  activeIndex: Animated.SharedValue<number>;
  width: number;
};
function ActiveIcon({item, index, activeIndex, width}: ActiveIconProps) {
  const circleIconStyle = useAnimatedStyle(() => {
    const isActive = index === activeIndex.value;
    const yOffset = isActive ? 0 : 80;
    return {
      transform: [
        {
          translateY: withDelay(isActive ? 150 : 0, withTiming(yOffset)),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          width: width,
          top: -8,
          left: width / 2,
          height: 64,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 5,
        },
        circleIconStyle,
      ]}>
      <View style={styles.activeIcon}>
        <FontAwesomeIcon icon={item} color="black" size={25} />
      </View>
    </Animated.View>
  );
}

function Bar() {
  const activeIndex = useSharedValue(0);

  const indicatorPosition = useDerivedValue(() => {
    return withTiming(activeIndex.value * tabWidth + tabWidth / 2, {
      duration: 500,
    });
  });

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: indicatorPosition.value}],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[{position: 'absolute', left: -tabWidth}, indicatorStyle]}>
        {tabs.map((tab, index) => (
          <ActiveIcon
            index={index}
            activeIndex={activeIndex}
            item={tab.item}
            width={tabWidth}
            key={`fg-${index}`}
          />
        ))}
        <Svg width={tabWidth * 2} height={64}>
          <Path fill={COLORS.screenBgColor} {...{d}} />
        </Svg>
      </Animated.View>
      {tabs.map((tab, index) => {
        const position = tabWidth * index + tabWidth / 2; // item center
        return (
          <Button
            index={index}
            activeIndex={activeIndex}
            item={tab.item}
            label={tab.label}
            width={tabWidth}
            indicatorPosition={indicatorPosition}
            position={position}
            key={`bg-${index}`}
          />
        );
      })}
    </View>
  );
}

const tabBarStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  dummyPusher: {
    flex: 1,
    height: 200,
    backgroundColor: 'red',
  },
});

function AnimatedTabBar(): React.ReactElement {
  return (
    <View style={tabBarStyles.container}>
      <View style={tabBarStyles.dummyPusher} />
      <Bar />
    </View>
  );
}

export default AnimatedTabBar;
