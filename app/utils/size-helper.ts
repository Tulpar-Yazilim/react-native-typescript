import {PixelRatio} from 'react-native';

import {SCREEN} from '../theme/config';

const screenWidth = SCREEN.width;
const screenHeight = SCREEN.height;
const defaultWidth = SCREEN.designWidth;
const defaultHeight = SCREEN.designHeight;
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
