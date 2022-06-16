import React, {FC, useLayoutEffect} from 'react';
import {COLORS, FONTS} from '@theme';
import {AppButton, AppSvgIcon} from '@components';
import {StatusBar} from 'react-native';
import {IconTypes} from '@assets';

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
              <AppSvgIcon
                width={33}
                height={33}
                name={IconTypes.BackButton}
                color="white"
              />
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
