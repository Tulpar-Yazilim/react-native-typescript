import React from 'react';

import images from '@/assets/images';
import {Text} from '@/components';

import AppImage from '../AppImage';
import Block from '../Block';

interface IEmptyList {
  text: string;
  image?: string;
}

const EmptyList = (props: IEmptyList) => {
  const {text, image = false} = props;

  return (
    <Block pressable flex center middle mb-72>
      {image && <AppImage resizeMode={'contain'} url={images.TulparLogo} height={75} width={66} />}
      <Text caption mt-32 center>
        {text}
      </Text>
    </Block>
  );
};

export default EmptyList;
