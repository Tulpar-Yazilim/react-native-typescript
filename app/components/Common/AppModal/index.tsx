import React, {memo} from 'react';

import Modal from 'react-native-modal';

import {COLORS} from '@/theme';

const AppModal = ({isVisible = false, onClose = () => {}, animationTime = 400, backdropColor = COLORS.black, backdropOpacity = 0.8, style = {}, children = <></>, ...props}) => (
  <Modal
    isVisible={isVisible}
    useNativeDriver
    useNativeDriverForBackdrop
    hideModalContentWhileAnimating
    avoidKeyboard
    backdropColor={backdropColor}
    backdropOpacity={backdropOpacity}
    style={[{margin: 0}, {...style}]}
    animationInTiming={animationTime}
    animationOutTiming={animationTime}
    backdropTransitionInTiming={animationTime}
    backdropTransitionOutTiming={animationTime}
    onDismiss={() => onClose && onClose()}
    onBackButtonPress={() => onClose && onClose()}
    onBackdropPress={() => onClose && onClose()}
    onSwipeComplete={() => onClose && onClose()}
    {...props}>
    {children}
  </Modal>
);

export default memo(AppModal);
