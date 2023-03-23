import {Platform, StyleSheet} from 'react-native';

import {COLORS, FONTS} from '@/theme';

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    paddingHorizontal: 14,
    marginVertical: 6,
  },
  input: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.black,
    fontFamily: FONTS.regular,
    left: Platform.OS === 'android' ? 5 : 8,
  },
  errorInput: {
    color: 'tomato',
  },
  errorContainer: {
    borderColor: 'tomato',
  },
});

export default styles;
