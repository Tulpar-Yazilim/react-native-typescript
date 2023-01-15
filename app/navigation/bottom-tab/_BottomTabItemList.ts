import {FetchDataPage} from '@screens';
import HomeStack from '../stacks/HomeStack';
import {IconNames} from './../../components/Common/AppIcon/index';

export const BottomTabItemList = [
  {
    label: 'Ana Sayfa',
    icon: IconNames.home,
    name: 'HomeScreen',
    component: HomeStack,
    headerShown: false,
  },
  {
    label: 'Data',
    icon: IconNames.home,
    name: 'FetchDataPage',
    component: FetchDataPage,
    headerShown: true,
  },
];
