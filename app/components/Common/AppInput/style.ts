import {Platform, StyleSheet} from 'react-native';

import {COLORS, FONTS} from '@/theme';

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    paddingHorizontal: 14,
  },
  input: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.black,
    fontFamily: FONTS.regular,
    left: Platform.OS === 'android' ? 5 : 8,
  },
  errorInput: {
    color: COLORS.error,
  },
  errorContainer: {
    borderColor: COLORS.error,
  },
});

export default styles;
