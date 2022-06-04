import React, {memo} from 'react';
import {Platform, Linking, Dimensions} from 'react-native';

import RenderHtml, {
  defaultSystemFonts,
  HTMLElementModel,
  HTMLContentModel,
} from 'react-native-render-html';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';

import {FONTS as THEME_FONTS} from '@theme';

import {Buffer} from 'buffer';
import * as md5Encrypt from 'md5';
import {i18next} from '@lang';

const {width} = Dimensions.get('screen');
const {t} = i18next;

enum ToastType {
  success = 'success',
  warning = 'warning',
  error = 'error',
  info = 'info',
}
class ToastParams {
  type: ToastType = ToastType.success;
  title: string = '';
  message: string = '';
  duration?: number = 5000;
}

class Coordinates {
  title?: string = '';
  description?: string = '';
  latitude: number = 0.0;
  longitude: number = 0.0;
}

const systemFonts = [...defaultSystemFonts, THEME_FONTS.fontFamily];

const customHTMLElementModels = {
  font: HTMLElementModel.fromCustomModel({
    tagName: 'font',
    contentModel: HTMLContentModel.textual,
  }),
};

const RenderHtmlComponent = ({html = '', styles = {}}) => {
  return (
    <RenderHtml
      systemFonts={systemFonts}
      baseStyle={{
        fontFamily: THEME_FONTS.fontFamily,
        ...styles,
      }}
      contentWidth={width}
      source={{html}}
      customHTMLElementModels={customHTMLElementModels}
      enableExperimentalMarginCollapsing
    />
  );
};

const HtmlRender = memo(RenderHtmlComponent);

const base64 = (sourceText: string): string => {
  return Buffer.from(sourceText, 'utf-8').toString('base64');
};

const getIpAddress = async (): Promise<string> => {
  try {
    const networkInfo: any = await NetInfo.fetch();
    return networkInfo.details?.ipAddress;
  } catch (error) {
    console.error(error);
    return '';
  }
};

const md5 = (sourceText: string): string => {
  return md5Encrypt.default(sourceText).toUpperCase();
};

const showToast = async (params: ToastParams) => {
  Toast.show({
    type: params.type,
    text1: params.title,
    text2: params.message,
    visibilityTime: params.duration,
  });
};

const openMap = (coordinates: Coordinates) => {
  const destination = coordinates.latitude + ',' + coordinates.longitude;
  let destionationUrl = '';
  if (Platform.OS === 'ios') {
    destionationUrl = 'maps://?q=' + destination;
  } else {
    destionationUrl =
      'geo:0,0?q=' + destination + '(' + coordinates.title + ')';
  }
  Linking.openURL(destionationUrl);
};

const openUrl = async (url: string) => {
  try {
    if (!url) {
      showToast({
        type: ToastType.info,
        title: t('warning'),
        message: t('no_url'),
      });
      return;
    }
    url = !url?.startsWith('http') ? `https://${url}` : url;
    const canOpen = await Linking.canOpenURL(`${url}`);
    if (canOpen) {
      await Linking.openURL(`${url}`);
    } else {
      showToast({
        type: ToastType.info,
        title: t('warning'),
        message: t('no_feature_support'),
      });
    }
  } catch (error) {
    console.error(error);
  }
};

const openPhone = async (phone: string) => {
  try {
    if (!phone) {
      showToast({
        type: ToastType.info,
        title: t('warning'),
        message: t('no_phone'),
      });
      return;
    }
    const canOpen = await Linking.canOpenURL(`tel:${phone}`);
    if (canOpen) {
      await Linking.openURL(`tel:${phone}`);
    } else {
      showToast({
        type: ToastType.info,
        title: t('warning'),
        message: t('no_feature_support'),
      });
    }
  } catch (error) {
    console.error(error);
  }
};

const openEmail = async (email: string) => {
  try {
    if (!email) {
      showToast({
        type: ToastType.info,
        title: t('warning'),
        message: t('no_email'),
      });
      return;
    }
    const canOpen = await Linking.canOpenURL(`mailto:${email}`);
    if (canOpen) {
      await Linking.openURL(`mailto:${email}`);
    } else {
      showToast({
        type: ToastType.info,
        title: t('warning'),
        message: t('no_feature_support'),
      });
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * Generate stylesheets for margin or padding
 * type: string - margin or padding
 * value: boolean (true), number, array or string ("2x", "0.5x")
 * defaultValue: integer
 *
 * Usage:
 * const marginSpacing = spacing("margin", true);
 * const paddingSpacing = spacing("padding", true, 10);
 * const marginSpacing = spacing("margin", 6);
 * const marginSpacing = spacing("margin", [4]); // vertical & horizontal => 4
 * const marginSpacing = spacing("margin", [4, 8]); // vertical => 4, horizontal => 8
 * const marginSpacing = spacing("margin", [4, 8, 2]); // top => 4, right & left => 8, bottom => 2
 * const marginSpacing = spacing("margin", [4, 8, 2, 6]); // top => 4, right => 8, bottom => 2, left => 6
 * const marginSpacing = spacing("margin", "2x", 10); // multiply 2 * 10 => margin 20
 * const marginSpacing = spacing("margin", "0.5x", 12); // multiply 0.5 * 10 => margin 6
 */

const getSpacings = (value: any, defaultValue = 0): any => {
  // if the value is boolean return defaultValue
  if (typeof value === 'boolean') {
    return defaultValue;
  }

  // if the value is integer/number
  if (typeof value === 'number') {
    return value;
  }

  // if the value is a string: 2x 4x 1.5x
  if (typeof value === 'string') {
    // extract decimal or integer value from value
    const valueMatch = value.match(/((?=.*[1-9])\d*(?:\.\d{1,2})|(\d*))x/)![0];

    if (!valueMatch) {
      return defaultValue;
    }
    return parseFloat(valueMatch) * (defaultValue > 0 ? defaultValue : 1);
  }

  // parse array of values [1, 2, 3, 4]
  if (typeof value === 'object') {
    const size = Object.keys(value).length;

    // get value based on array index
    // vertical
    const top = 0;
    const bottom = size === 1 || size === 2 ? 0 : 2;

    // horizontal
    const right = size === 1 ? 0 : 1;
    const left = size === 1 ? 0 : size === 2 ? 1 : 3;

    return {
      top: value[top] || defaultValue,
      right: value[right] || defaultValue,
      bottom: value[bottom] || defaultValue,
      left: value[left] || defaultValue,
    };
  }
};

const getMargins = ({
  margin,
  m,
  marginTop,
  mt,
  marginBottom,
  mb,
  marginRight,
  mr,
  marginLeft,
  ml,
  marginVertical,
  my,
  marginHorizontal,
  mx,
  defaultValue,
}: any) => {
  const styles: any = {};

  if (margin) {
    const values = getSpacings(margin, defaultValue);
    const isArray = typeof margin === 'object';

    styles.marginTop = isArray ? values.top : values;
    styles.marginRight = isArray ? values.right : values;
    styles.marginBottom = isArray ? values.bottom : values;
    styles.marginLeft = isArray ? values.left : values;
  }
  if (m) {
    const values = getSpacings(m, defaultValue);
    const isArray = typeof m === 'object';

    styles.marginTop = isArray ? values.top : values;
    styles.marginRight = isArray ? values.right : values;
    styles.marginBottom = isArray ? values.bottom : values;
    styles.marginLeft = isArray ? values.left : values;
  }

  if (marginTop && typeof marginTop !== 'object') {
    styles.marginTop = getSpacings(marginTop, defaultValue);
  }
  if (mt && typeof mt !== 'object') {
    styles.marginTop = getSpacings(mt, defaultValue);
  }

  if (marginBottom && typeof marginBottom !== 'object') {
    styles.marginBottom = getSpacings(marginBottom, defaultValue);
  }
  if (mb && typeof mb !== 'object') {
    styles.marginBottom = getSpacings(mb, defaultValue);
  }

  if (marginLeft && typeof marginLeft !== 'object') {
    styles.marginLeft = getSpacings(marginLeft, defaultValue);
  }
  if (ml && typeof ml !== 'object') {
    styles.marginLeft = getSpacings(ml, defaultValue);
  }

  if (marginRight && typeof marginRight !== 'object') {
    styles.marginRight = getSpacings(marginRight, defaultValue);
  }
  if (mr && typeof mr !== 'object') {
    styles.marginRight = getSpacings(mr, defaultValue);
  }

  if (marginVertical && typeof marginVertical !== 'object') {
    styles.marginTop = getSpacings(marginVertical, defaultValue);
    styles.marginBottom = getSpacings(marginVertical, defaultValue);
  }
  if (my && typeof my !== 'object') {
    styles.marginTop = getSpacings(my, defaultValue);
    styles.marginBottom = getSpacings(my, defaultValue);
  }

  if (marginHorizontal && typeof marginHorizontal !== 'object') {
    styles.marginRight = getSpacings(marginHorizontal, defaultValue);
    styles.marginLeft = getSpacings(marginHorizontal, defaultValue);
  }
  if (mx && typeof mx !== 'object') {
    styles.marginRight = getSpacings(mx, defaultValue);
    styles.marginLeft = getSpacings(mx, defaultValue);
  }

  return styles;
};

const getPaddings = ({
  padding,
  p,
  paddingTop,
  pt,
  paddingBottom,
  pb,
  paddingRight,
  pr,
  paddingLeft,
  pl,
  paddingVertical,
  py,
  paddingHorizontal,
  px,
  defaultValue,
}: any) => {
  const styles: any = {};

  if (padding) {
    const values = getSpacings(padding, defaultValue);
    const isArray = typeof padding === 'object';

    styles.paddingTop = isArray ? values.top : values;
    styles.paddingRight = isArray ? values.right : values;
    styles.paddingBottom = isArray ? values.bottom : values;
    styles.paddingLeft = isArray ? values.left : values;
  }
  if (p) {
    const values = getSpacings(p, defaultValue);
    const isArray = typeof p === 'object';

    styles.paddingTop = isArray ? values.top : values;
    styles.paddingRight = isArray ? values.right : values;
    styles.paddingBottom = isArray ? values.bottom : values;
    styles.paddingLeft = isArray ? values.left : values;
  }

  if (paddingTop && typeof paddingTop !== 'object') {
    styles.paddingTop = getSpacings(paddingTop, defaultValue);
  }
  if (pt && typeof pt !== 'object') {
    styles.paddingTop = getSpacings(pt, defaultValue);
  }

  if (paddingBottom && typeof paddingBottom !== 'object') {
    styles.paddingBottom = getSpacings(paddingBottom, defaultValue);
  }
  if (pb && typeof pb !== 'object') {
    styles.paddingBottom = getSpacings(pb, defaultValue);
  }

  if (paddingLeft && typeof paddingLeft !== 'object') {
    styles.paddingLeft = getSpacings(paddingLeft, defaultValue);
  }
  if (pl && typeof pl !== 'object') {
    styles.paddingLeft = getSpacings(pl, defaultValue);
  }

  if (paddingRight && typeof paddingRight !== 'object') {
    styles.paddingRight = getSpacings(paddingRight, defaultValue);
  }
  if (pr && typeof pr !== 'object') {
    styles.paddingRight = getSpacings(pr, defaultValue);
  }

  if (paddingVertical && typeof paddingVertical !== 'object') {
    styles.paddingTop = getSpacings(paddingVertical, defaultValue);
    styles.paddingBottom = getSpacings(paddingVertical, defaultValue);
  }
  if (py && typeof py !== 'object') {
    styles.paddingTop = getSpacings(py, defaultValue);
    styles.paddingBottom = getSpacings(py, defaultValue);
  }

  if (paddingHorizontal && typeof paddingHorizontal !== 'object') {
    styles.paddingRight = getSpacings(paddingHorizontal, defaultValue);
    styles.paddingLeft = getSpacings(paddingHorizontal, defaultValue);
  }
  if (px && typeof px !== 'object') {
    styles.paddingRight = getSpacings(px, defaultValue);
    styles.paddingLeft = getSpacings(px, defaultValue);
  }

  return styles;
};

/**
 * Merge 2 theme with a default theme and extra theme
 * to rewrite the default values with new values
 * using ES6 spread operator
 * Theme accepted data structure format:
 * const theme1 = {
 *   COLORS: {
 *     primary: "red",
 *     secondary: "green",
 *     // see theme.js
 *   },
 *   SIZES: {
 *     // see theme.js
 *   },
 *   FONTS: {
 *     // see theme.js
 *   },
 *   WEIGHTS: {
 *     // see theme.js
 *   }
 * }
 *
 * const theme2 = {
 *   COLORS: {
 *     primary: "blue",
 *   }
 * }
 *
 * Usage
 * const appTheme = mergeTheme(theme1, theme2);
 * const { COLORS } = appTheme;
 * COLORS.primary will return value "blue"
 * COLORS.secondary will return value "green"
 */

const mergeTheme = (theme: any, extra: any) => {
  const {COLORS, SIZES, FONTS, WEIGHTS, ...rest} = extra;
  return {
    COLORS: {...theme?.COLORS, ...COLORS},
    SIZES: {...theme?.SIZES, ...SIZES},
    FONTS: {...theme?.FONTS, ...FONTS},
    WEIGHTS: {...theme?.WEIGHTS, ...WEIGHTS},
    ...rest,
  };
};

export {
  getSpacings,
  getMargins,
  getPaddings,
  mergeTheme,
  HtmlRender,
  base64,
  getIpAddress,
  md5,
  ToastType,
  ToastParams,
  showToast,
  Coordinates,
  openMap,
  openUrl,
  openPhone,
  openEmail,
};
