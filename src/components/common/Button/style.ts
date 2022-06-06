import {StyleSheet} from 'react-native';
import {COLORS, FONTS} from '@theme';

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
  container: {
    paddingVertical: 16,
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

export default styles;
