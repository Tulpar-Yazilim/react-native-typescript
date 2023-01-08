import {StyleSheet} from 'react-native';
import {COLORS, FONTS, fingerSize} from '@theme';
import {IButtonTypes} from './app-button';

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
  container: {
    zIndex: 999,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 50,
    width: '100%',
  },
  text: {
    fontSize: 18,
    fontFamily: FONTS.semiBold,
    height: 26,
  },
});

export const buttonTypesStyles: IButtonTypes = {
  primary: {
    text: {
      color: COLORS.secondary,
      fontWeight: 'bold',
    },
  },
  secondary: {
    text: {
      color: COLORS.white,
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
