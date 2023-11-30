/* eslint-disable react/no-unstable-nested-components */
import React, {memo, useEffect, useState} from 'react';
import {Pressable} from 'react-native';

import moment from 'moment';
import {Calendar} from 'react-native-calendars';
import {Direction, Theme} from 'react-native-calendars/src/types';

import {useTheme, useThemeMode} from '@/hooks';
import {FONTS, SIZES} from '@/theme';

import {AppCalendarProps, DateComponentProps} from './app-calendar';
import {styles} from './styles';
import AppIcon from '../AppIcon';
import Block from '../Block';
import Text from '../Text';

const AppCalendar = (props: AppCalendarProps) => {
  const {firstDay = 1, enableSwipeMonths = true, onSelectDay, ...otherProps} = props;

  const themeMode = useThemeMode();
  const {colors} = useTheme();
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));

  const initialTheme = {
    backgroundColor: colors.primary,
    calendarBackground: colors.primary,
    textSectionTitleColor: colors.gray,
    textSectionTitleDisabledColor: colors.lightGray,
    selectedDayBackgroundColor: colors.secondary,
    selectedDayTextColor: colors.white,
    todayTextColor: colors.white,
    dayTextColor: colors.white,
    textDisabledColor: colors.gray,
    dotColor: colors.secondary,
    selectedDotColor: '#FFF',
    arrowColor: colors.gray,
    disabledArrowColor: colors.lightGray,
    monthTextColor: colors.gray,
    indicatorColor: colors.gray,
    textDayFontFamily: FONTS.regular,
    textMonthFontFamily: FONTS.medium,
    textDayHeaderFontFamily: FONTS.semiBold,
    textMonthFontWeight: '400',
    textDayFontSize: 14,
    textMonthFontSize: 20,
    textDayHeaderFontSize: 13,
  } as Theme;

  const [{key, theme}, setTheme] = useState({
    key: (themeMode === 'dark' ? 'dark_' : 'normal_') + new Date().getTime(),
    theme: initialTheme,
  });

  useEffect(() => {
    if (themeMode === 'dark') {
      setTheme({
        ...theme,
        key: 'dark_' + new Date().getTime(),
        theme: {
          ...initialTheme,
          backgroundColor: colors?.cardBg,
          calendarBackground: colors?.cardBg,
          selectedDayBackgroundColor: colors?.cardBg,
        },
      });
    } else {
      setTheme({
        ...theme,
        key: 'normal_' + new Date().getTime(),
        theme: {
          ...initialTheme,
        },
      });
    }
  }, [themeMode, colors]);

  const DayComponent = ({date, marking}: DateComponentProps) => {
    return (
      <Pressable
        onPress={() => {
          if (date?.dateString) {
            setSelectedDate(date?.dateString);
            onSelectDay?.(date?.dateString);
          }
        }}>
        <Block backgroundColor={date?.dateString === selectedDate ? 'secondary' : 'primary'} borderRadius={SIZES.radius} w={46} h={46} pt={7} pr={12}>
          <Block>
            <Text medium size={14} color={colors.white}>
              {date?.day?.toString?.()}
            </Text>
          </Block>
          {marking?.marked && (
            <Block pt-7 pl-9>
              <Block w={12} h={4} borderRadius={SIZES.radius} backgroundColor={date?.dateString === selectedDate ? 'white' : 'secondary'} />
            </Block>
          )}
        </Block>
      </Pressable>
    );
  };

  const ArrowComponent = (direction: Direction) => <AppIcon name={direction === 'left' ? 'chevronLeft' : 'chevronRight'} size={22} color={colors.gray} />;

  return (
    <Calendar key={key} firstDay={firstDay} enableSwipeMonths={enableSwipeMonths} style={styles.calendar} theme={theme} renderArrow={ArrowComponent} dayComponent={DayComponent} {...otherProps} />
  );
};

export default memo(AppCalendar);
