/* eslint-disable react-native/no-inline-styles */
import {Block} from '@components';
import React, {FC} from 'react';
import {Dimensions} from 'react-native';
// @ts-ignore
import CalendarPicker from 'react-native-calendar-picker';
import {font, window, color} from '@theme';
import {Icon} from '../../../assets/icons';
import moment from 'moment';

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
        color: color.dark,
        fontSize: 16,
        fontFamily: font.medium,
      },
    };
  };

  const customDatesStylesCallback = (date: any) => {
    return {
      style: {},
      textStyle: {
        color: color.dark,
        // flex:1,
        // backgroundColor:'red',
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: font.medium,
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
        todayBackgroundColor={color.primary}
        initialDate={new Date(initialDate) || new Date()}
        selectedStartDate={new Date(initialDate) || new Date()}
        selectedDayStyle={{
          backgroundColor: color.primary,
          width: '100%',
          height: '100%',
          borderWidth: 0,
          borderRadius: 8,
          borderColor: color.primary,
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
        previousComponent={<Icon name="ArrowLeft" width={24} height={24} />}
        nextComponent={<Icon name="ArrowRight" width={24} height={24} />}
        monthTitleStyle={{
          fontSize: 18,
          fontFamily: font.bold,
          color: color.primary,
        }}
        yearTitleStyle={{
          fontSize: 18,
          fontFamily: font.bold,
          color: color.primary,
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
