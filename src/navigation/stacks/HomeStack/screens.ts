import {HomeDetail} from '../../../screens/HomeDetail/HomeDetail';
import {IScreen} from '../Models/IScreen';
import routes from '../../routes';
import {HomePage} from '@screens';

const Screens = [
  {
    title: 'Ana Sayfa',
    name: routes.HOME_SCREEN,
    component: HomePage,
    headerShown: true,
  },
  {
    title: 'Detay Sayfası',
    name: routes.HOME_DETAIL_SCREEN,
    component: HomeDetail,
    headerShown: true,
  },
] as Array<IScreen>;

export default Screens;
