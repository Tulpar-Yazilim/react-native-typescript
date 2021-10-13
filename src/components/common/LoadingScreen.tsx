import React from 'react';
import {ActivityIndicator, Modal} from 'react-native';
import {Block} from '@theme';

const LoadingScreen = () => {
  return (
    <Modal>
      <Block
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
      </Block>
    </Modal>
  );
};

export default LoadingScreen;
