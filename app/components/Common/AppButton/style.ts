import {StyleSheet} from 'react-native';

import {IButtonTypes} from './app-button';

import {COLORS, fingerSize, FONTS} from '@/theme';

const styles = StyleSheet.create({
  disabled: {
    backgroundColor: COLORS.info,
  },
  container: {
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontFamily: FONTS.semiBold,
  },
  activityIndicator: {
    paddingRight: 10,
  },
});

export const buttonTypesStyles: IButtonTypes = {
  primary: {
    text: {
      color: COLORS.white,
      fontWeight: 'bold',
    },
  },
  secondary: {
    text: {
      color: COLORS.black,
    },
  },
  outline: {
    container: {
      backgroundColor: COLORS.secondary,
    },
    text: {
      color: COLORS.white,
    },
  },
  icon: {
    container: {
      width: fingerSize,
      height: fingerSize,
      padding: 0,
    },
    text: {},
  },
};

export default styles;
