import {MainStackNavigationProps} from './types';
import {BottomTabNavigation} from '../../bottom-tab/BottomTabNavigation';
import {DrawerMenuNavigaiton} from '../../drawer/DrawerMenuNavigation';
import Routes from '../../Routes';
import {IScreen} from '../Models/IScreen';

import {LoginPage, SplashScreen} from '@/screens';

const Screens = [
  {
    title: 'Splash Screen',
    name: Routes.SPLASH_SCREEN,
    component: SplashScreen,
    headerShown: false,
  },
  {
    title: 'Login Page',
    name: Routes.LOGIN_SCREEN,
    component: LoginPage,
    headerShown: false,
  },
  {
    title: 'Side Menu',
    name: Routes.MAIN_DRAWER_ROOT,
    component: DrawerMenuNavigaiton,
    headerShown: false,
  },
  {
    title: 'Tab Menu',
    name: Routes.MAIN_TABS_ROOT,
    component: BottomTabNavigation,
    headerShown: false,
  },
] as Array<IScreen<MainStackNavigationProps>>;

export default Screens;
