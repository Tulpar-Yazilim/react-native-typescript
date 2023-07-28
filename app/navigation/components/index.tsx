import React, {useLayoutEffect} from 'react';
import {StatusBar} from 'react-native';

import {NavigationProp} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';

import {AppButton} from '@/components';
import {useTheme} from '@/hooks';
import {i18n} from '@/lang/i18';
import {COLORS, FONTS} from '@/theme';
import {ScreenType} from '@/utils';

type Props = {
  title?: string;
  navigation: NavigationProp<ReactNavigation.RootParamList>;
  navigationOptions?: StackNavigationOptions | undefined;
  canGoBack?: boolean;
};

const BackButton = ({navigation, canGoBack}: Props) => {
  return navigation.canGoBack() && canGoBack !== false ? <AppButton w-40 h-40 type="icon" icon={'chevronLeft'} iconSize={26} iconColor={COLORS.white} onPress={() => navigation.goBack()} /> : null;
};
export const Header = (props: Props) => {
  const {colors} = useTheme();
  const {title, navigationOptions, navigation} = props;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: colors.headerBackgroundColor,
      },
      ...(title && {...{headerTitle: i18n.t(title)}}),
      headerTitleStyle: {
        ...FONTS.title,
        color: colors.headerColor,
      },
      headerTitleAlign: 'center',
      headerLeft: () => <BackButton {...props} />,
      ...navigationOptions,
    });
  }, [title, navigation, colors, navigationOptions]);

  return <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />;
};

export const createNavigationOptions = (props: ScreenType, extraOptions?: StackNavigationOptions) => {
  const exParam = extraOptions ?? {};
  const {title, headerShown} = props;
  const options = {
    headerStyle: {},
    headerTitle: i18n?.isInitialized ? i18n?.t(title as string) : '',
    headerTruncatedBackTitle: '',
    headerBackImageStyle: {},
    headerBackTitleStyle: {
      fontSize: 15,
    },
    headerRightContainerStyle: {},
    headerLeftContainerStyle: {},
    headerTitleStyle: {
      fontSize: 15,
    },
    ...exParam,
  };

  return headerShown ? options : {headerShown: false};
};
