import {ModalProps, navigatePage} from '@/utils';

export default function Modal() {
  const show = ({route, params}: ModalProps) => {
    navigatePage({name: route, params});
  };

  return {show};
}
