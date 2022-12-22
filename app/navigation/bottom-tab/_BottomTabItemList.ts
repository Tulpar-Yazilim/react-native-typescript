import {AboutScreen} from '../../screens/About/AboutScreen';
import HomeStack from '../stacks/HomeStack/index';
import {TicketsScreen} from '../../screens/Tickets/Tickets';

export const BottomTabItemList = [
  {
    label: 'Home',
    icon: 'home',
    component: HomeStack,
    headerShown: false,
  },
  {
    label: 'Tickets',
    icon: 'bookmark',
    component: TicketsScreen,
    headerShown: false,
  },
  {
    label: 'Support',
    icon: 'info',
    component: AboutScreen,
    headerShown: true,
  },
];
