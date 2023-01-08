import {
  checkMultiple,
  PERMISSIONS,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';
import {Platform} from 'react-native';

const PLATFORM_CAMERA_PERMISSIONS = {
  ios: [PERMISSIONS.IOS.CAMERA],
  android: [
    PERMISSIONS.ANDROID.CAMERA,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  ],
} as any;

const PLATFORM_PHOTO_LIBRARY_PERMISSIONS = {
  ios: [PERMISSIONS.IOS.PHOTO_LIBRARY],
  android: [
    PERMISSIONS.ANDROID.CAMERA,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  ],
} as any;

const REQUEST_PERMISSION_TYPE = {
  camera: PLATFORM_CAMERA_PERMISSIONS,
  photo: PLATFORM_PHOTO_LIBRARY_PERMISSIONS,
} as any;

const PERMISSION_TYPE = {
  camera: 'camera',
  photo: 'photo',
};

class AppPermission {
  checkPermission = async (type: any) => {
    try {
      const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS];
      const statuses = await checkMultiple(permissions);
      const isAllGranted = Object.entries(statuses)
        .map(item => item[1])
        .every(item => item === RESULTS.GRANTED);
      if (isAllGranted) {
        return true;
      }
      return this.requestPermission(permissions);
    } catch (error) {
      console.error('checkPermission error', error);
      return false;
    }
  };

  requestPermission = async (permissions: any) => {
    try {
      const statuses = await requestMultiple(permissions);
      const isAllGranted = Object.entries(statuses)
        .map(item => item[1])
        .every(item => item === RESULTS.GRANTED);
      return isAllGranted;
    } catch (error) {
      console.log('requestPermission error', error);
      return false;
    }
  };
}

const Permission = new AppPermission();
export {Permission, PERMISSION_TYPE};
