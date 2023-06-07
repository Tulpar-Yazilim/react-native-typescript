import {HomeStackNavigationProps} from './types';
import routes from '../../Routes';

import {FetchDataPage, FormPage, HomePage} from '@/screens';
import {IScreen} from '@/utils';

const Screens = [
  {
    title: 'home',
    name: routes.HOME_SCREEN,
    component: HomePage,
    headerShown: true,
  },
  {
    title: 'fetch_data',
    name: routes.FETCH_DATA_SCREEN,
    component: FetchDataPage,
    headerShown: true,
  },
  {
    title: 'form',
    name: routes.FORM_SCREEN,
    component: FormPage,
    headerShown: true,
  },
] as Array<IScreen<HomeStackNavigationProps>>;

export default Screens;
