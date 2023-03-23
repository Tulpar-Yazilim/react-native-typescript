import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import Routes from '@/navigation/Routes';
import {DialogProps, Keyof} from '@/utils';

export type MainStackNavigationProps = {
  [Routes.SPLASH_SCREEN]: undefined;
  [Routes.LOGIN_SCREEN]: undefined;
  [Routes.MAIN_DRAWER_ROOT]: undefined;
  [Routes.MAIN_TABS_ROOT]: undefined;
  [Routes.ALERT]: DialogProps;
};

export type MainStackNavigationPropsType = StackNavigationProp<MainStackNavigationProps>;

export type MainStackNavigationRouteType<TPageName extends Keyof<MainStackNavigationProps>> = RouteProp<MainStackNavigationProps, TPageName>;
