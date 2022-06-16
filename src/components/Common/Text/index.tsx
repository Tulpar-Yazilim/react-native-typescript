import React, {memo} from 'react';
import {Animated, StyleSheet, Text, Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {SIZES, COLORS} from '@theme';
import {useTranslate} from '@hooks';
import {
  getStyleShortcuts,
  getTextStyleShortcuts,
} from '../../../utils/StyleShortcut';

const Typography = (props: any) => {
  const {children, params, animated, ...rest} = props;

  // Translations
  const _translate = useTranslate(children, params);
  const i18nText = _translate ? _translate : children;

  // Content
  const content = i18nText || '';

  const textStyles = StyleSheet.flatten([
    {
      fontSize: RFValue(SIZES.font, Dimensions.get('window').height),
      color: COLORS.black,
    },
    {...getStyleShortcuts(props), ...getTextStyleShortcuts(props)},
  ]);

  if (animated) {
    return (
      <Animated.Text {...rest} style={textStyles}>
        {content}
      </Animated.Text>
    );
  }

  return (
    <Text {...rest} style={textStyles}>
      {content}
    </Text>
  );
};

export default memo(Typography);
