import {AppButton, AppIcon} from '@/components';
import {useTheme} from '@/hooks';
import {COLORS, FONTS} from '@/theme';
import {ICONS} from '@/utils';
import React, {FC, useLayoutEffect} from 'react';
import {StatusBar} from 'react-native';

const BackButton = ({props, navigation}: any) =>
  props.canGoBack && (
    <AppButton
      w-40
      h-40
      type="icon"
      icon={<AppIcon name={ICONS.chevronLeft} size={24} color={COLORS.white} />}
      onPress={() => navigation.goBack()}
    />
  );

export const Header: FC<any> = ({navigationOptions, navigation}) => {
  const {colors} = useTheme();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: colors.headerBackgroundColor,
      },
      headerTitleStyle: {
        ...FONTS.title,
        color: colors.headerColor,
      },
      headerTitleAlign: 'center',
      headerLeft: (props: any) => (
        <BackButton props={props} navigation={navigation} />
      ),
      ...navigationOptions,
    });
  }, [navigation, colors]);

  return (
    <>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
    </>
  );
};
