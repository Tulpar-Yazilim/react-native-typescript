import React, {memo, useEffect} from 'react';

import LinearGradient from 'react-native-linear-gradient';
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';

import {Block, Text} from '@/components';
import {useThemeMode} from '@/hooks';

import {FloatingButtonProps} from './floating-button';
import styles from './styles';

function FloatingButton(props: Readonly<FloatingButtonProps>) {
  const {isVisible, buttonText = 'approve', closeButtonText = 'not_now', onPress, onClose} = props;

  //#region Animation
  const bottomTranslateValue = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateY: bottomTranslateValue.value}],
    };
  });

  useEffect(() => {
    bottomTranslateValue.value = withTiming(isVisible ? 5 : 175);
  }, [isVisible]);
  //#endregion

  const themeMode = useThemeMode();
  const shadowColors = themeMode === 'light' ? ['#00000000', '#000000B3', '#000000'] : ['#FFFFFFFF', '#FFFFFFB3', '#FFFFFF'];

  return (
    <Animated.View style={[styles.animatedView, animatedStyles]}>
      <LinearGradient colors={shadowColors} style={styles.menuGradient}>
        <Block center mt-10>
          <Block pressable onPress={onPress}>
            <Block p-10 px-20 rounded-50 bg-primary>
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

export default memo(FloatingButton);
