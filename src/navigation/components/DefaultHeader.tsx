import React, {FC, useLayoutEffect} from 'react';
import {COLORS, FONTS} from '@theme';
import {Button} from '@components';
import {Icon} from '../../assets/icons/index';
import {StatusBar} from 'react-native';

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
          <Button
            type="icon"
            icon={
              <Icon width={33} height={33} name="BackButton" color="white" />
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
