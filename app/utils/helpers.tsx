import React, {memo} from 'react';
import {Platform, Linking, Dimensions} from 'react-native';

import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import ImageResizer from 'react-native-image-resizer';
import {launchImageLibrary} from 'react-native-image-picker';

import RenderHtml, {
  defaultSystemFonts,
  HTMLElementModel,
  HTMLContentModel,
} from 'react-native-render-html';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';

import {Permission, PERMISSION_TYPE} from './permission';
import {Coordinates, ToastParams} from './models';
import {ToastType} from './enums';
import {ImagePickerResultType, ImageResizeResultType} from './types';

import {FONTS as THEME_FONTS} from '@theme';

import {Buffer} from 'buffer';
import * as md5Encrypt from 'md5';
import {i18next} from '@lang';

const {width} = Dimensions.get('screen');
const {t} = i18next;

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

const resizeImageSingle = async (
  image: any,
): Promise<ImageResizeResultType> => {
  try {
    let image_width: number = image.width / 5;
    let image_height: number = image.height / 5;

    let newImage = await ImageResizer.createResizedImage(
      image.path,
      image_width,
      image_height,
      'JPEG',
      60, //quality
      0, //rotation
      undefined, //outputPath if null will save on cache
      false,
    );

    let returnData: ImageResizeResultType = {
      name: image.filename,
      type: Platform.OS === 'ios' ? image.type : image.type + '/jpeg',
      uri: newImage.uri,
    };

    return Platform.OS === 'android' ? returnData : {...image, ...newImage};
  } catch (error) {
    return image;
  }
};

const resizeImageMultiple = async (
  response: Array<any>,
): Promise<Array<ImageResizeResultType>> => {
  let resized_images = [];
  for (const element of response) {
    let resizedImage = await resizeImageSingle(element);
    resized_images.push(resizedImage);
  }
  return resized_images;
};

const launchMultipleImages = async () => {
  await Permission.checkPermission(PERMISSION_TYPE.photo);
  const response = await MultipleImagePicker.openPicker({});
  const resizedImagesArr = await resizeImageMultiple(response);
  return resizedImagesArr;
};

const launchSingleImage = async (): Promise<ImagePickerResultType> => {
  return new Promise(resolve => {
    launchImageLibrary({mediaType: 'photo'}, async (res: any) => {
      if (!res.didCancel) {
        let selectedImage = res.assets[0];
        const resizedImage = await resizeImageSingle(selectedImage);
        resolve({image: resizedImage, status: true});
      } else {
        resolve({image: null, status: false});
      }
    });
  });
};

export {
  HtmlRender,
  base64,
  getIpAddress,
  md5,
  ToastParams,
  showToast,
  Coordinates,
  openMap,
  openUrl,
  openPhone,
  openEmail,
  resizeImageSingle,
  resizeImageMultiple,
  launchMultipleImages,
  launchSingleImage,
};
