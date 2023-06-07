import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {Routes} from '@/navigation';
import {Keyof} from '@/utils';

export type HomeScreen = {
  name: string;
};

export type HomeStackNavigationProps = {
  [Routes.HOME_SCREEN]: {
    name: string;
  };
  [Routes.FORM_SCREEN]: {
    detailId: string;
  };
};

export type HomeStackNavigationPropsType = StackNavigationProp<HomeStackNavigationProps>;

export type HomeStackNavigationRouteType<TPageName extends Keyof<HomeStackNavigationProps>> = RouteProp<HomeStackNavigationProps, TPageName>;
