import {HomeDetail} from '../../../screens/HomeDetail/HomeDetail';
import {IScreen} from '../Models/IScreen';
import Routes from '../../Routes';
import {HomePage} from '@screens';

const Screens = [
  {
    title: 'Ana Sayfa',
    name: Routes.HOME_SCREEN,
    component: HomePage,
    headerShown: false,
  },
  {
    title: 'Home Detail',
    name: Routes.HOME_DETAIL_SCREEN,
    component: HomeDetail,
    headerShown: true,
  },
] as Array<IScreen>;

export default Screens;
