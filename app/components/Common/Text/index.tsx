import React, {memo} from 'react';
import {Animated, Pressable, StyleSheet, Text, TouchableOpacity} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';

import {useTheme, useTranslate} from '@/hooks';
import {SCREEN, SIZES} from '@/theme';
import {HtmlRender, UseThemeType} from '@/utils';

import {TextProps} from './text';

const Typography = (props: TextProps) => {
  const {children, params, pressable, touchable, html, onPress, animated, ...otherProps} = props;
  const {textStyles, styles} = useTheme(props as UseThemeType);

  // Translations
  const _translate = useTranslate(children as string, params);
  const i18nText = _translate || children;

  // Content
  const content = i18nText ?? '';

  const insideStyles = StyleSheet.flatten([
    {
      fontSize: RFValue(SIZES.font, SCREEN.height),
    },
    textStyles,
    styles,
    props.style,
  ]);

  const TextComponent = animated ? Animated.Text : Text;
  const PressableComponent = pressable ? Pressable : TouchableOpacity;

  if (pressable || touchable) {
    if (html) {
      return (
        <PressableComponent onPress={onPress}>
          <HtmlRender html={content as string} styles={insideStyles} />
        </PressableComponent>
      );
    }
    return (
      <PressableComponent onPress={onPress}>
        <TextComponent {...otherProps} style={insideStyles}>
          {content}
        </TextComponent>
      </PressableComponent>
    );
  }

  if (html) {
    return <HtmlRender html={content as string} />;
  }

  return (
    <TextComponent {...otherProps} style={insideStyles}>
      {content}
    </TextComponent>
  );
};

export default memo(Typography);
