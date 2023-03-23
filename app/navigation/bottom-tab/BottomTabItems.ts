import {BottomTabStackNavigationProps} from './types';
import {ICONS} from '../../utils/icon-enums';
import Routes from '../Routes';
import HomeStack from '../stacks/HomeStack';
import {IScreen} from '../stacks/Models/IScreen';

import {FetchDataPage} from '@/screens';

export const Screens = [
  {
    title: 'Home',
    name: Routes.HOME_SCREEN,
    component: HomeStack,
    icon: ICONS.home,
    headerShown: true,
  },
  {
    title: 'Fetch Data Example',
    name: Routes.FETCH_DATA_SCREEN,
    component: FetchDataPage,
    icon: ICONS.info,
    headerShown: true,
  },
] as Array<IScreen<BottomTabStackNavigationProps>>;
