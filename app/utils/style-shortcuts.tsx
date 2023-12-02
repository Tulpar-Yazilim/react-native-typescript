import {StyleProp, ViewProps} from 'react-native';

import {COLORS, getStyles, getTextStyles} from '@/theme';

import {IStyles} from './infrastructure/interfaces';
import {UseThemeType} from './infrastructure/types';
import {setupSizes} from './style/size';

const sizes = Object.freeze({...setupSizes});

const defaultTextStyles = {
  color: COLORS.defaultTextColor,
  fontFamily: 'Poppins-Regular',
};

const StyleCorrespondings = {
  bg: 'backgroundColor',
  flex: 'flex',
  backgroundColor: 'backgroundColor',
  borderColor: 'borderColor',
  rounded: 'borderRadius',
};

export const getStyleShortcuts = (props: UseThemeType, t?: 'light' | 'dark') => {
  let styles = {} as IStyles | StyleProp<ViewProps>;
  const {shortcutStyles, predefinedStyles} = getStyles(t ?? 'light');

  if (props.s) {
    props.s.split(' ').forEach(prop => {
      const customProp = prop as never;
      const customShortcut = shortcutStyles[customProp];
      if (customShortcut) {
        if (styles) styles[customShortcut] = props[customProp];
      } else {
        const customPredefinedStyles = predefinedStyles?.[customProp] as object;
        if (customPredefinedStyles) {
          styles = {...(styles as object), ...(sizes?.[customProp] as object), ...customPredefinedStyles};
        } else {
          styles = {...(styles as object), ...(sizes?.[customProp] as object)};
        }
      }
    });
  }

  Object.keys(props).forEach(prop => {
    const customProp = prop as never;
    const customShortcut = shortcutStyles?.[customProp];

    if (styles && Object.keys(StyleCorrespondings).includes(customProp)) {
      styles[StyleCorrespondings[customProp]] = COLORS[props[customProp]] || props[customProp];
    }

    if (customShortcut) {
      if (styles) {
        styles[customShortcut] = props[customProp];
      }
    } else {
      const customPredefinedStyles = predefinedStyles?.[customProp] as object;
      if (customPredefinedStyles) {
        styles = {...(styles as object), ...customPredefinedStyles, ...(sizes?.[customProp] as object)};
      } else {
        styles = {...(styles as object), ...(sizes?.[customProp] as object)};
      }
    }
  });

  return {...(styles as object)};
};

export const getTextStyleShortcuts = (props: UseThemeType, t?: 'light' | 'dark') => {
  let styles = {} as object;

  const predefinedTextStyles = getTextStyles(t ?? 'light');

  Object.keys(props).forEach(prop => {
    const customProp = prop as never;
    const customPredefinedTextStyles = predefinedTextStyles?.[customProp] as object;
    if (customPredefinedTextStyles) {
      styles = {...defaultTextStyles, ...styles, ...customPredefinedTextStyles, ...(sizes?.[customProp] as object)};
    } else {
      styles = {...defaultTextStyles, ...styles, ...(sizes?.[customProp] as object)};
    }
  });

  return styles;
};
