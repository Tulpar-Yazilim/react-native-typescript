import DeviceInfo from "react-native-device-info";

const getDeviceInfo = () => DeviceInfo.getUniqueIdSync();
const getDeviceBatteryInfo = () => DeviceInfo.getBatteryLevelSync();
const getDeviceSystemVersion = () => DeviceInfo.getSystemVersion();
const getDeviceApplicationVersion = () => DeviceInfo.getVersion();

export {
  getDeviceInfo,
  getDeviceBatteryInfo,
  getDeviceSystemVersion,
  getDeviceApplicationVersion,
};
