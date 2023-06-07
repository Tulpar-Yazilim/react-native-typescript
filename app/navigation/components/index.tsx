import React, {useLayoutEffect} from 'react';
import {StatusBar} from 'react-native';

import {NavigationProp} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';

import {AppButton} from '@/components';
import {useTheme} from '@/hooks';
import {i18n} from '@/lang/i18';
import {rootNavigationRef} from '@/navigation';
import {COLORS, FONTS} from '@/theme';
import {ScreenType} from '@/utils';

type Props = {
  title?: string;
  navigation: NavigationProp<ReactNavigation.RootParamList>;
  navigationOptions: StackNavigationOptions | undefined;
};

const BackButton = () => {
  return rootNavigationRef.canGoBack() ? <AppButton w-40 h-40 type="icon" icon={'chevronLeft'} iconColor={COLORS.white} onPress={() => rootNavigationRef.goBack()} /> : null;
};
export const Header = ({title, navigationOptions, navigation}: Props) => {
  const {colors} = useTheme();
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
      headerLeft: () => <BackButton />,
      ...navigationOptions,
    });
  }, [title, navigation, colors, navigationOptions]);

  return <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />;
};

export const createNavigationOptions = (props: ScreenType) => {
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
  };

  return headerShown ? options : {headerShown: false};
};
