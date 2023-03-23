import {HomeStackNavigationProps} from './types';
import routes from '../../Routes';
import {IScreen} from '../Models/IScreen';

import {FetchDataPage, FormPage, HomePage} from '@/screens';

const Screens = [
  {
    title: 'Home',
    name: routes.HOME_SCREEN,
    component: HomePage,
    headerShown: true,
  },
  {
    title: 'Fetch Data Example',
    name: routes.FETCH_DATA_SCREEN,
    component: FetchDataPage,
    headerShown: true,
  },
  {
    title: 'Form Example',
    name: routes.FORM_SCREEN,
    component: FormPage,
    headerShown: true,
  },
] as Array<IScreen<HomeStackNavigationProps>>;

export default Screens;
