import React, {FC, useState} from 'react';

import {AppInput, AppScreen, Block} from '@/components';

export const AboutScreen: FC = () => {
  const [inputValue, setInputValue] = useState('');

  return (
    <AppScreen keyboardScroll>
      <Block mb={300}>
        <AppInput
          value={inputValue}
          onChangeText={_text => {
            setInputValue(_text);
          }}
          placeholder="test"
        />
      </Block>
      <AppInput
        value={inputValue}
        onChangeText={_text => {
          setInputValue(_text);
        }}
        animatedPlaceholder="Name Name Name Name"
      />
    </AppScreen>
  );
};
