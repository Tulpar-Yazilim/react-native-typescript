import React, {memo} from 'react';
import {Dimensions, Linking, Platform} from 'react-native';

import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import notifee, {Notification, TimestampTrigger, TriggerType} from '@notifee/react-native';
import {fetch} from '@react-native-community/netinfo';
import {Buffer} from 'buffer';
import md5Encrypt from 'md5';
import {launchImageLibrary} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import RenderHtml, {defaultSystemFonts, HTMLContentModel, HTMLElementModel} from 'react-native-render-html';
import Toast from 'react-native-toast-message';

import {i18next} from '@/lang';
import {FONTS as THEME_FONTS} from '@/theme';

import {LocalNotificationType, ToastType} from './infrastructure/enums';
import {Coordinates, ImagePickerResultType, ImageResizeResultType, ImageType, LocalNotificationParams, ToastParams} from './infrastructure/types';
import {Permission, PERMISSION_TYPE} from './permission';

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
  type NetworkInfo = {
    details: {
      ipAddress: string;
    };
  };
  try {
    const networkInfo = (await getNetInfo()) as NetworkInfo;
    return networkInfo?.details?.ipAddress;
  } catch (error) {
    console.error(error);
    return '';
  }
};

const getNetInfo = async () => await fetch();

const md5 = (sourceText: string): string => {
  return md5Encrypt(sourceText).toUpperCase();
};

const showToast = async (params: ToastParams) => {
  Toast.show({
    type: params.type,
    text1: params.title,
    text2: params.message,
    visibilityTime: params.duration ?? 5000,
    position: params.position ?? 'top',
  });
};

const openMap = (coordinates: Coordinates) => {
  const destination = coordinates.latitude + ',' + coordinates.longitude;
  let destionationUrl = '';
  if (Platform.OS === 'ios') {
    destionationUrl = `maps://?q=${destination}`;
  } else {
    destionationUrl = `geo:0,0?q=${destination}${coordinates.title && '(' + coordinates.title + ')'}`;
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

const resizeImageSingle = async (image: ImageType): Promise<ImageResizeResultType> => {
  try {
    const imageWidth: number = image.width / 5;
    const imagHeight: number = image.height / 5;

    const newImage = await ImageResizer.createResizedImage(
      image.path,
      imageWidth,
      imagHeight,
      'JPEG',
      60, //quality
      0, //rotation
      undefined, //outputPath if null will save on cache
      false,
    );

    const returnData: ImageResizeResultType = {
      name: image.filename,
      type: Platform.OS === 'ios' ? image.type : image.type + '/jpeg',
      uri: newImage.uri,
    };

    return Platform.OS === 'android' ? returnData : ({...image, ...newImage} as ImageResizeResultType);
  } catch (error) {
    return {
      name: '',
      type: '',
      uri: '',
    } as ImageResizeResultType;
  }
};

const resizeImageMultiple = async (response: Array<ImageType>): Promise<Array<ImageResizeResultType>> => {
  const resizedImages = [];
  for (const element of response) {
    const resizedImage = await resizeImageSingle(element);
    resizedImages.push(resizedImage);
  }
  return resizedImages;
};

const launchMultipleImages = async () => {
  await Permission.checkPermission(PERMISSION_TYPE.photo);
  const response = await MultipleImagePicker.openPicker({});
  const customImages = response.map(image => ({width: image.width, height: image.height, filename: image.fileName, path: image.path, type: image.type} as ImageType));
  const resizedImagesArr = await resizeImageMultiple(customImages);
  return resizedImagesArr;
};

const launchSingleImage = async (): Promise<ImagePickerResultType> => {
  return new Promise(resolve => {
    launchImageLibrary({mediaType: 'photo'}, async res => {
      if (!res.didCancel) {
        const selectedImage = res.assets?.[0];
        if (selectedImage) {
          const customImage: ImageType = {
            width: selectedImage.width || 0,
            height: selectedImage.height || 0,
            filename: selectedImage.fileName || '',
            path: selectedImage.uri || '',
            type: selectedImage.type || '',
          };
          const resizedImage = await resizeImageSingle(customImage);
          resolve({image: resizedImage, status: true});
        } else {
          resolve({image: null, status: false});
        }
      } else {
        resolve({image: null, status: false});
      }
    });
  });
};

const createLocalNotification = async (notification: LocalNotificationParams) => {
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
    const notificationId = await notifee.createTriggerNotification(notificationDto, trigger);

    return notificationId;
  } else {
    const notificationId = await notifee.displayNotification(notificationDto);
    return notificationId;
  }
};

const cancelLocalNotification = async (localNotificationId: string) => {
  await notifee.cancelNotification(localNotificationId);
};

const convertToCurrency = (amount: number | string, currency = '₺') => `${Number.parseFloat(amount.toString()).toFixed(2)} ${currency}`;

export {
  HtmlRender,
  base64,
  getIpAddress,
  getNetInfo,
  md5,
  showToast,
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
  convertToCurrency,
};
