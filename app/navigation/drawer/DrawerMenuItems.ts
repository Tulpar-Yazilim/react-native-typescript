import {ScreenType} from '@/utils';

import {AboutScreen} from '../../screens/About/AboutScreen';
import HomeStack from '../stacks/HomeStack/index';

export const DrawerMenuItemList: ScreenType[] = [
  {
    label: 'home',
    icon: 'Car',
    component: HomeStack,
    headerShown: false,
  },
  {
    label: 'about',
    icon: 'Car',
    component: AboutScreen,
    headerShown: true,
  },
];
