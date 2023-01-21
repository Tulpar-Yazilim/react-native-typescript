import React, {memo} from 'react';
import {Dimensions, Linking, Platform} from 'react-native';

import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

import NetInfo from '@react-native-community/netinfo';
import RenderHtml, {
  HTMLContentModel,
  HTMLElementModel,
  defaultSystemFonts,
} from 'react-native-render-html';
import Toast from 'react-native-toast-message';

import notifee, {
  Notification,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';

import {ToastType} from './enums';
import {
  Coordinates,
  LocalNotificationParams,
  LocalNotificationType,
  ToastParams,
} from './models';
import {PERMISSION_TYPE, Permission} from './permission';
import {ImagePickerResultType, ImageResizeResultType} from './types';

import {FONTS as THEME_FONTS} from '@/theme';

import {i18next} from '@/lang';
import {Buffer} from 'buffer';
import * as md5Encrypt from 'md5';

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

const createLocalNotification = async (
  notification: LocalNotificationParams,
) => {
  // Request permissions (required for iOS)
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'reactnativetypescript',
    name: 'React Native Typescript',
  });

  const notificationDto: Notification = {
    id: notification.id ?? new Date().getTime().toString(),
    title: notification.title,
    body: notification.message,
    android: {
      channelId,
      smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  };

  if (notification.type === LocalNotificationType.Schedule) {
    // Create a time-based trigger
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: notification.scheduleDate?.getTime() || 0,
    };

    // Display a notification
    const notificationId = await notifee.createTriggerNotification(
      notificationDto,
      trigger,
    );

    return notificationId;
  } else {
    const notificationId = await notifee.displayNotification(notificationDto);
    return notificationId;
  }
};

const cancelLocalNotification = async (localNotificationId: string) => {
  await notifee.cancelNotification(localNotificationId);
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
  createLocalNotification,
  cancelLocalNotification,
};
