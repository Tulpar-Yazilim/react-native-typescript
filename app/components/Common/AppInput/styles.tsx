import {Platform, StyleSheet} from 'react-native';

import {useTheme} from '@/hooks';
import {COLORS, FONTS} from '@/theme';

const styles = StyleSheet.create({
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
  animatedPlaceholderStyle: {
    flex: 1,
    left: 0,
    position: 'absolute',
    fontSize: 14,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 100,
    fontFamily: FONTS.medium,
    color: '#ACACAC',
  },
});

export const useContainerStyle = (error?: string) => {
  const theme = useTheme();
  return {
    borderRadius: 4,
    paddingHorizontal: 14,
    backgroundColor: COLORS.inputBg,
    borderWidth: error ? 0.5 : 0,
    borderColor: theme.colors.error,
  };
};

export default styles;
