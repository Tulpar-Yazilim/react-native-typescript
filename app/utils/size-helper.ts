import {PixelRatio} from 'react-native';

import {window} from '../theme/Config';

const screenWidth = window.width;
const screenHeight = window.height;
const defaultWidth = window.designWidth;
const defaultHeight = window.designHeight;
const widthBaseScale = screenWidth / defaultWidth;
const heightBaseScale = screenHeight / defaultHeight;

export const normalize = (size: number, based = 'width') => {
  const newSize = based === 'height' ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};
export const widthPixel = (size: number) => {
  return normalize(size);
};
export const heightPixel = (size: number) => {
  return normalize(size, 'height');
};
export const fontPixel = (size: number) => {
  return normalize(size, 'height');
};
