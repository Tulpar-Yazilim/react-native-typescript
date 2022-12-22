import React, {FC, useLayoutEffect} from 'react';
import {StatusBar} from 'react-native';
import {COLORS, FONTS} from '@theme';
import {AppButton, AppIcon} from '@components';
import {ICONS} from '@utils';

export const Header: FC<any> = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: COLORS.primary,
      },
      headerTitleStyle: {
        fontSize: 19,
        fontFamily: FONTS.semiBold,
        color: 'white',
      },
      headerTitleAlign: 'center',
      headerLeft: (props: any) =>
        props.canGoBack && (
          <AppButton
            type="icon"
            icon={
              <AppIcon name={ICONS.arrowLeft} size={33} color={COLORS.white} />
            }
            onPress={() => navigation.goBack()}
          />
        ),
    });
  }, [navigation]);

  return (
    <>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
    </>
  );
};
