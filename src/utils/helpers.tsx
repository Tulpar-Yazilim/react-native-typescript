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

export {
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
