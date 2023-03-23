export interface Props extends ComponentProps {
  isVisible: boolean;
  buttonText?: string;
  onPress: () => void;
  onClose: () => void;
  closeButtonText?: string;
}
