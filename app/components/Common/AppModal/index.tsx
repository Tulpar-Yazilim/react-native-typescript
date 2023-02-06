import React, { memo } from "react";
import { COLORS } from "@/theme";
import Modal from "react-native-modal";

const AppModal = ({
  isVisible = false,
  onClose = () => {},
  animationTime = 400,
  backdropColor = COLORS.black,
  backdropOpacity = 0.8,
  style = {},
  children = <></>,
}) => (
  <Modal
    isVisible={isVisible}
    useNativeDriver
    useNativeDriverForBackdrop
    hideModalContentWhileAnimating
    avoidKeyboard
    backdropColor={backdropColor}
    backdropOpacity={backdropOpacity}
    style={[{ margin: 0 }, { ...style }]}
    animationInTiming={animationTime}
    animationOutTiming={animationTime}
    backdropTransitionInTiming={animationTime}
    backdropTransitionOutTiming={animationTime}
    onDismiss={() => onClose && onClose()}
    onBackButtonPress={() => onClose && onClose()}
    onBackdropPress={() => onClose && onClose()}
    onSwipeComplete={() => onClose && onClose()}
  >
    {children}
  </Modal>
);

export default memo(AppModal);
