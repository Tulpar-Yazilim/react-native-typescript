import {request, openSettings, check} from 'react-native-permissions';

const requestPermissions = async (permissions: any) => {
  const isRequestPermission = await request(permissions);
  if (isRequestPermission === 'granted') {
    return true;
  } else if (isRequestPermission === 'blocked') {
    openSettings();
    return false;
  }
};

const checkPermissions = async (permissions: any) => {
  const isCheckPermission = await check(permissions);
  if (isCheckPermission === 'granted') {
    return true;
  } else if (isCheckPermission === 'blocked') {
    return false;
  }
};

export {requestPermissions, checkPermissions};
