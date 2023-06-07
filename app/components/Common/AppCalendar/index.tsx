import React, {memo, useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';

import moment from 'moment';
import {Calendar} from 'react-native-calendars';

import AppIcon from '../AppIcon';
import Block from '../Block';
import Text from '../Text';

import {COLORS, FONTS, SIZES} from '@/theme';

const AppCalendar = ({onSelectDay = (_date: string) => {}, ...props}) => {
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  return (
    <Calendar
      firstDay={1}
      enableSwipeMonths
      style={styles.calendar}
      theme={{
        backgroundColor: COLORS.primary,
        calendarBackground: COLORS.primary,
        textSectionTitleColor: COLORS.gray,
        textSectionTitleDisabledColor: COLORS.lightGray,
        selectedDayBackgroundColor: COLORS.secondary,
        selectedDayTextColor: COLORS.white,
        todayTextColor: COLORS.white,
        dayTextColor: COLORS.white,
        textDisabledColor: COLORS.gray,
        dotColor: COLORS.secondary,
        selectedDotColor: '#FFF',
        arrowColor: COLORS.gray,
        disabledArrowColor: COLORS.lightGray,
        monthTextColor: COLORS.gray,
        indicatorColor: COLORS.gray,
        textDayFontFamily: FONTS.regular,
        textMonthFontFamily: FONTS.medium,
        textDayHeaderFontFamily: FONTS.semiBold,
        textMonthFontWeight: '400',
        textDayFontSize: 14,
        textMonthFontSize: 20,
        textDayHeaderFontSize: 13,
      }}
      renderArrow={direction => <AppIcon name={direction === 'left' ? 'chevronLeft' : 'chevronRight'} size={22} color={COLORS.gray} />}
      dayComponent={({
        date = {
          dateString: '',
          day: '',
          month: '',
          year: '',
          timestamp: 0,
        },
        marking = {marked: false},
      }) => {
        return (
          <Pressable
            onPress={() => {
              setSelectedDate(date?.dateString);
              onSelectDay(date?.dateString);
            }}>
            <Block backgroundColor={date?.dateString === selectedDate ? COLORS.secondary : COLORS.primary} borderRadius={SIZES.radius} w={46} h={46} pt={7} pr={12}>
              <Block>
                <Text right semibold size={14} color={COLORS.white}>
                  {date.day}
                </Text>
              </Block>
              {marking?.marked && (
                <Block pt-7 pl-9>
                  <Block w={12} h={4} borderRadius={SIZES.radius} backgroundColor={date?.dateString === selectedDate ? COLORS.white : COLORS.secondary} />
                </Block>
              )}
            </Block>
          </Pressable>
        );
      }}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  calendar: {
    height: '100%',
    width: '100%',
  },
});

export default memo(AppCalendar);
