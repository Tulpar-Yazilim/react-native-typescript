/* eslint-disable react-native/no-inline-styles */
import {Block} from '@components';
import React, {FC} from 'react';
import {Dimensions} from 'react-native';
// @ts-ignore
import CalendarPicker from 'react-native-calendar-picker';
import {FONTS, COLORS, window} from '@theme';
import AppSvgIcon from '../AppSvgIcon';
import moment from 'moment';
import {IconTypes} from '@assets';

type Props = {
  onChange?: any;
  initialDate?: any;
};

export const Calendar: FC<Props> = props => {
  const {onChange, initialDate} = props;

  const onDateChange = (date: any) => {
    onChange(date);
  };

  const customDayHeaderStylesCallback = ({dayOfWeek, month, year}: any) => {
    return {
      style: {
        borderRadius: 12,
        backgroundColor: '#F7F7F7',
        width: Dimensions.get('window').width / 8.6,
        height: Dimensions.get('window').width / 8.6,
        alignItems: 'center',
        justifyContent: 'center',
      },
      textStyle: {
        color: COLORS.black,
        fontSize: 16,
        fontFamily: FONTS.medium,
      },
    };
  };

  const customDatesStylesCallback = (date: any) => {
    return {
      style: {},
      textStyle: {
        color: COLORS.black,
        // flex:1,
        // backgroundColor:'red',
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: FONTS.medium,
      },

      containerStyle: [
        {
          padding: 0,
          marginLeft: 4,
          marginBottom: 4,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: '#EFF0F2',
          width: window.width / 8.6,
          height: window.width / 8.6,
          alignItems: 'center',
          justifyContent: 'center',
        },
      ],
    };
  };

  return (
    <Block flex={1}>
      <CalendarPicker
        monthYearHeaderWrapperStyle={
          {
            // backgroundColor: 'red',
          }
        }
        dayShape="circle"
        todayBackgroundColor={COLORS.primary}
        initialDate={new Date(initialDate) || new Date()}
        selectedStartDate={new Date(initialDate) || new Date()}
        selectedDayStyle={{
          backgroundColor: COLORS.primary,
          width: '100%',
          height: '100%',
          borderWidth: 0,
          borderRadius: 8,
          borderColor: COLORS.primary,
          color: 'red',
        }}
        selectedDayTextStyle={{
          color: 'white',
        }}
        todayTextStyle={{}}
        minDate={moment()}
        width={Dimensions.get('window').width - 16}
        headerWrapperStyle={{
          backgroundColor: '#F7F7F7',
          width: window.width - 32,
          height: 50,
          borderRadius: 10,
        }}
        previousComponent={
          <AppSvgIcon name={IconTypes.ArrowBack} width={24} height={24} />
        }
        nextComponent={
          <AppSvgIcon name={IconTypes.ArrowRight} width={24} height={24} />
        }
        monthTitleStyle={{
          fontSize: 18,
          fontFamily: FONTS.bold,
          color: COLORS.primary,
        }}
        yearTitleStyle={{
          fontSize: 18,
          fontFamily: FONTS.bold,
          color: COLORS.primary,
        }}
        weekdays={['M', 'T', 'W', 'T', 'F', 'S', 'S']}
        onDateChange={onDateChange}
        customDatesStyles={customDatesStylesCallback}
        customDayHeaderStyles={customDayHeaderStylesCallback}
        dayLabelsWrapper={{
          borderTopWidth: 0,
          borderBottomWidth: 0,
          width: window.width - 32,
          justifyContent: 'space-between',
          paddingHorizontal: 5,
        }}
      />
    </Block>
  );
};
