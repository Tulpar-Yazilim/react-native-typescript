import {getBatteryLevelSync, getSystemVersion, getUniqueIdSync, getVersion} from 'react-native-device-info';

const getDeviceInfo = () => getUniqueIdSync();
const getDeviceBatteryInfo = () => getBatteryLevelSync();
const getDeviceSystemVersion = () => getSystemVersion();
const getDeviceApplicationVersion = () => getVersion();

export {getDeviceInfo, getDeviceBatteryInfo, getDeviceSystemVersion, getDeviceApplicationVersion};
