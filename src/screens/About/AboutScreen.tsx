import React, {FC, useState} from 'react';
import {Block, Input, Screen} from '@components';

export const AboutScreen: FC<any> = ({}) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <Screen keyboardScroll>
      <Block>
        <Input
          value={inputValue}
          onChange={(text: string) => {
            setInputValue(text);
          }}
          animatedPlaceholder="Name"
        />
      </Block>
      <Input
        value={inputValue}
        onChange={(text: string) => {
          setInputValue(text);
        }}
        animatedPlaceholder="Name Name Name Name"
      />
    </Screen>
  );
};
