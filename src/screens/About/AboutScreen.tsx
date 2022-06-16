import React, {FC, useState} from 'react';
import {Block, AppInput, AppScreen} from '@components';

export const AboutScreen: FC<any> = ({}) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <AppScreen keyboardScroll>
      <Block mb={300}>
        <AppInput
          value={inputValue}
          onChange={(text: string) => {
            setInputValue(text);
          }}
          placeholder="test"
        />
      </Block>
      <AppInput
        value={inputValue}
        onChange={(text: string) => {
          setInputValue(text);
        }}
        animatedPlaceholder="Name Name Name Name"
      />
    </AppScreen>
  );
};
