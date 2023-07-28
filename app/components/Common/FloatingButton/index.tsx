import React, {memo, useEffect} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Animated, {AnimatedStyleProp, useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';

import {Block, Text} from '@/components';
import {useAppSelector} from '@/hooks';
import {COLORS} from '@/theme';

import {Props} from './floating-button';

function FloatingButton({isVisible = false, buttonText = 'approve', onPress = () => {}, closeButtonText = 'not_now', onClose = () => {}}: Props) {
  //#region Animation
  const bottomTranslateValue = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateY: bottomTranslateValue.value}],
    } as AnimatedStyleProp<ViewStyle>;
  });

  useEffect(() => {
    bottomTranslateValue.value = withSpring(isVisible ? 5 : 175);
  }, [isVisible]);
  //#endregion

  const theme = useAppSelector(state => state.settings.theme);
  const shadowColors = theme === 'light' ? ['#00000000', '#000000B3', '#000000'] : ['#00000000', '#000000B3', '#000000'];

  return (
    <Animated.View style={[styles.animatedView, animatedStyles]}>
      <LinearGradient colors={shadowColors} style={styles.menuGradient}>
        <Block center mt-10>
          <Block pressable onPress={onPress}>
            <Block p-10 px-20 rounded-50 style={{backgroundColor: COLORS.primary}}>
              <Text white>{buttonText}</Text>
            </Block>
          </Block>
          <Block pressable onPress={onClose} mt-10>
            <Text white>{closeButtonText}</Text>
          </Block>
        </Block>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  animatedView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  menuGradient: {
    height: 175,
    flex: 1,
  },
});

export default memo(FloatingButton);
