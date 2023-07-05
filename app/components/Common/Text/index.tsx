import React, {memo} from 'react';
import {Animated, Dimensions, Pressable, StyleProp, StyleSheet, Text, TextStyle} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';

import {useTheme, useTranslate} from '@/hooks';
import {SIZES} from '@/theme';
import {ITextStyles, setupSizeTypes, UseThemeType} from '@/utils';

type SetupSizeTypes = Omit<setupSizeTypes, 'setupSizeTypes'>;

interface Props extends SetupSizeTypes, ITextStyles {
  params?: object;
  children?: string | string[];
  animated?: boolean;
  style?: StyleProp<TextStyle>;
  pressable?: boolean;
  onPress?: () => void;
}

const Typography = (props: Props) => {
  const {children, params, pressable, onPress, animated, ...rest} = props;
  const {textStyles, styles} = useTheme(props as UseThemeType);

  // Translations
  const _translate = useTranslate(children as string, params);
  const i18nText = _translate ? _translate : children;

  // Content
  const content = i18nText || '';

  const insideStyles = StyleSheet.flatten([
    {
      fontSize: RFValue(SIZES.font, Dimensions.get('window').height),
    },
  ]);

  if (animated) {
    return (
      <Animated.Text {...rest} style={[insideStyles, textStyles, styles, props.style]}>
        {content}
      </Animated.Text>
    );
  }

  if (pressable) {
    return (
      <Pressable onPress={onPress}>
        <Text {...rest} style={[textStyles, styles, props.style]}>
          {content}
        </Text>
      </Pressable>
    );
  }

  return (
    <Text {...rest} style={[textStyles, styles, props.style]}>
      {content}
    </Text>
  );
};

export default memo(Typography);
