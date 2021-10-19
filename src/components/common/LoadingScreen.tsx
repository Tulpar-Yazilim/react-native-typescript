import React from 'react';
import {ActivityIndicator, Modal, View} from 'react-native';

const LoadingScreen = () => {
  return (
    <Modal>
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.7)',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator color="#fff" size="large" />
      </View>
    </Modal>
  );
};

export default LoadingScreen;
