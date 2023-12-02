import React, {memo} from 'react';

import Modal from 'react-native-modal';

import {COLORS, generalStyles} from '@/theme';

import {ModalProps} from './app-modal';

const AppModal = (props: ModalProps) => {
  const {isVisible = false, onClose = () => {}, animationTime = 400, backdropColor = COLORS.black, backdropOpacity = 0.8, style, children = <></>, ...otherProps} = props;
  return (
    <Modal
      isVisible={isVisible}
      useNativeDriver
      useNativeDriverForBackdrop
      hideModalContentWhileAnimating
      avoidKeyboard
      backdropColor={backdropColor}
      backdropOpacity={backdropOpacity}
      style={[generalStyles.noMargin, style]}
      animationInTiming={animationTime}
      animationOutTiming={animationTime}
      backdropTransitionInTiming={animationTime}
      backdropTransitionOutTiming={animationTime}
      onDismiss={onClose}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      {...otherProps}>
      {children}
    </Modal>
  );
};

export default memo(AppModal);
