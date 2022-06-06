import {Platform} from 'react-native';
import {PERMISSIONS} from 'react-native-permissions';

const PermissionsList = {
  camera:
    Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
};

export {PermissionsList};
