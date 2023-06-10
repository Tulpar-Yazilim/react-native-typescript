import React, {memo} from 'react';
import {Animated, Dimensions, StyleProp, StyleSheet, Text, TextStyle} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';

import {useTheme, useTranslate} from '@/hooks';
import {SIZES} from '@/theme';
import {ITextStyles, UseThemeType} from '@/utils';

interface Props extends ITextStyles {
  params?: object;
  children?: string | string[];
  animated?: boolean;
  style?: StyleProp<TextStyle>;
}

const Typography = (props: Props) => {
  const {children, params, animated, ...rest} = props;
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

  return (
    <Text {...rest} style={[textStyles, styles, props.style]}>
      {content}
    </Text>
  );
};

export default memo(Typography);
