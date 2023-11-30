import {AnimationObject} from 'lottie-react-native';

export type LottieViewProps = {
  animation: string | AnimationObject;
  autoPlay?: boolean;
  loop?: boolean;
};
