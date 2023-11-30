import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  bg: {
    height: '100%',
    zIndex: -2,
  },
  contain: {
    zIndex: 9999,
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
  },
  content: {
    width: '90%',
    borderRadius: 8,
  },
  contentButton: {
    justifyContent: 'flex-end',
    padding: 10,
    borderColor: 'gray',
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
});

export default styles;
