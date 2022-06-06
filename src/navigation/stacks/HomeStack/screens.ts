import {HomeScreen} from './../../../screens/Home/HomeScreen';
import {HomeDetail} from '../../../screens/HomeDetail/HomeDetail';
import {IScreen} from '../Models/IScreen';
import routes from '../../routes';

const Screens = [
  {
    title: 'Ana Sayfa',
    name: routes.HOME_SCREEN,
    component: HomeScreen,
    headerShown: false,
  },
  {
    title: 'Home Detail',
    name: routes.HOME_DETAIL_SCREEN,
    component: HomeDetail,
    headerShown: true,
  },
] as Array<IScreen>;

export default Screens;
