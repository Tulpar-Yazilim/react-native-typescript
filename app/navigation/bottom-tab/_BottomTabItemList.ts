import {FetchDataPage, HomePage} from '@screens';
import HomeStack from '../stacks/HomeStack';

export const BottomTabItemList = [
  {
    label: 'Ana Sayfa',
    icon: 'home',
    name: 'HomeScreen',
    component: HomeStack,
    headerShown: false,
  },
  {
    label: 'Data',
    icon: 'home',
    name: 'FetchDataPage',
    component: FetchDataPage,
    headerShown: true,
  },
];
