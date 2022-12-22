import {COLORS, FONTS} from '@theme';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    // borderColor: color.primary,
    backgroundColor: '#fff',
    height: 52,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 3,
  },
  input: {
    fontSize: 16,
    color: COLORS.black,
    fontFamily: FONTS.regular,
    flex: 1,
    width: '100%',
    left: 8,
    paddingBottom: -5,
  },
  errorInput: {
    color: 'tomato',
  },
  errorContainer: {
    borderColor: 'tomato',
  },
});

export default styles;
