import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {Platform} from 'react-native';

const PLATFORM_PHOTO_LIBRARY_PERMISSIONS = {
  ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
  android: PERMISSIONS.IOS.PHOTO_LIBRARY,
} as any;

const REQUEST_PERMISSION_TYPE = {
  photo: PLATFORM_PHOTO_LIBRARY_PERMISSIONS,
} as any;

const PERMISSION_TYPE = {
  photo: 'photo',
};

class AppPermission {
  checkPermission = async (type: any) => {
    const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS];
    if (!permissions) {
      console.log('permissions', permissions);
      return true;
    }
    try {
      const result = await check(permissions);
      if (result === RESULTS.GRANTED) {
        return true;
      }
      return this.requestPermission(permissions);
    } catch (error) {
      return error;
    }
  };

  requestPermission = async (permissions: any) => {
    try {
      const result = await request(permissions);
      console.log('request result', result);
      return result === RESULTS.GRANTED;
    } catch (error) {
      console.log('request error', error);
      return false;
    }
  };
}

const Permission = new AppPermission();
export {Permission, PERMISSION_TYPE};
