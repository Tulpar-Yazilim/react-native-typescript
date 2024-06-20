import {Dimensions, ScaledSize} from 'react-native';

const activeWindow: ScaledSize = Dimensions.get('window');
export const screenWidth: number = activeWindow.width;
export const screenHeight: number = activeWindow.height;

export const widthPixel = (size: number) => {
  return size;
};
export const heightPixel = (size: number) => {
  return size;
};
export const fontPixel = (size: number) => {
  return size;
};
