import {BottomTabStackNavigationProps} from './types';
import {ICONS} from '../../utils/icon-enums';
import Routes from '../Routes';
import HomeStack from '../stacks/HomeStack';

import {FetchDataPage} from '@/screens';
import {IScreen} from '@/utils';

export const Screens = [
  {
    title: 'home',
    name: Routes.HOME_ROOT,
    component: HomeStack,
    icon: ICONS.home,
    headerShown: false,
  },
  {
    title: 'fetch_data',
    name: Routes.FETCH_DATA_SCREEN,
    component: FetchDataPage,
    icon: ICONS.info,
    headerShown: true,
  },
] as IScreen<BottomTabStackNavigationProps>[];
