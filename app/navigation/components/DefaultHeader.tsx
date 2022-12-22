import React, {FC, useLayoutEffect} from 'react';
import {StatusBar} from 'react-native';
import {COLORS, FONTS} from '@theme';
import {AppButton, AppIcon} from '@components';
import {ICONS} from '@utils';

const BackButton = ({props, navigation}) =>
  props.canGoBack && (
    <AppButton
      type="icon"
      icon={<AppIcon name={ICONS.chevronLeft} size={24} color={COLORS.white} />}
      onPress={() => navigation.goBack()}
    />
  );

export const Header: FC<any> = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: COLORS.headerBackgroundColor,
      },
      headerTitleStyle: {
        ...FONTS.title,
        color: COLORS.headerColor,
      },
      headerTitleAlign: 'center',
      headerLeft: (props: any) => (
        <BackButton props={props} navigation={navigation} />
      ),
    });
  }, [navigation]);

  return (
    <>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
    </>
  );
};
