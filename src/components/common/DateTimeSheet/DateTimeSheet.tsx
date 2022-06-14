import BottomSheet from '../BottomSheet/BottomSheet';
import React from 'react';
import {Block} from '../Block/Block';
import {Calendar} from '../Calendar/Calendar';
import {window} from '@theme';
import {AppButton} from '@components';
import {FC} from 'react';

type Props = {
  sheetRef?: any;
  onChange?: any;
  initialDate?: any;
};

export const DateTimeSheet: FC<Props> = (props: any) => {
  const {sheetRef, onChange, initialDate} = props;

  let temp_date = initialDate;

  return (
    <BottomSheet
      ref={sheetRef}
      height={550}
      openDuration={400}
      closeOnDragDown
      closeOnPressMask>
      <Calendar
        initialDate={temp_date}
        onChange={(date: any) => {
          temp_date = date;
        }}
      />
      {/*<Block px={window.offset + 7}>
        <Button mr={10} type="secondary" title="Cancel" onPress={() => {}} />
      </Block>*/}
      <Block direction="row" px={window.offset + 7}>
        <AppButton
          mr={10}
          flex={1}
          type="secondary"
          title="Cancel"
          onPress={() => {
            sheetRef.current.close();
          }}
        />
        <AppButton
          flex={1}
          type="primary"
          title="Choose Date"
          onPress={() => {
            sheetRef.current.close();
            setTimeout(() => {
              onChange(temp_date);
            }, 400);
          }}
        />
      </Block>
    </BottomSheet>
  );
};
