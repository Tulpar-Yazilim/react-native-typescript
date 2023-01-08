import React, {memo} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const LoadingScreen = ({
  backgroundColor = 'rgba(0,0,0,0.7)',
  color = '#FFF',
}) => {
  return (
    <View style={[styles.container, {backgroundColor}]}>
      <ActivityIndicator color={color} size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(LoadingScreen);
