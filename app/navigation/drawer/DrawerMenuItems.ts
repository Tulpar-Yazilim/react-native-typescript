import {AboutScreen} from '../../screens/About/AboutScreen';
import HomeStack from '../stacks/HomeStack/index';

export const DrawerMenuItemList = [
  {
    label: 'Home',
    icon: 'Car',
    component: HomeStack,
    headerShown: false,
  },
  {
    label: 'About',
    icon: 'Car',
    component: AboutScreen,
    headerShown: true,
  },
];
