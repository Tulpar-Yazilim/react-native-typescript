import {Permission, PERMISSION_TYPE} from './Permission';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import {Platform} from 'react-native';
import ImageResizer from 'react-native-image-resizer';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const resizeImageSingle = async (image: any) => {
  try {
    //let divider = height > 500 ? 1.5 : 1;
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

    let returnData = {
      name: image.filename,
      type: Platform.OS === 'ios' ? image.type : image.type + '/jpeg',
      uri: newImage.uri,
    };

    return Platform.OS == 'android' ? returnData : {...image, ...newImage};
  } catch (error) {
    return image;
  }
};

export const resizeImageMultiple = async (response: Array<any>) => {
  let resized_images = [];

  for (let i = 0; i < response.length; i++) {
    let resizedImage = await resizeImageSingle(response[i]);
    resized_images.push(resizedImage);
  }

  return resized_images;
};

export const launchMultipleImages = async () => {
  const res = await Permission.checkPermission(PERMISSION_TYPE.photo);
  const response = await MultipleImagePicker.openPicker({});
  const resizedImagesArr = await resizeImageMultiple(response);

  return resizedImagesArr;
};

export const launchSingleImage = async () => {
  let data = {};

  const result = launchImageLibrary({mediaType: 'photo'}, async (res: any) => {
    if (!res.didCancel) {
      let selectedImage = res.assets[0];
      const resizedImage = await resizeImageSingle(selectedImage);
      data = {image: resizedImage, status: true};
    } else {
      data = {image: undefined, status: false};
    }
  });

  return result;
};
