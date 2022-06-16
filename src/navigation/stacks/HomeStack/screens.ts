import {HomeDetail} from '../../../screens/HomeDetail/HomeDetail';
import {IScreen} from '../Models/IScreen';
import {HomePage} from '@screens';
import routes from '../../Routes';
import {TestPage} from '../../../screens/TestPage';

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
  {
    title: 'malik korucu',
    name: 'test-page',
    component: TestPage,
    headerShown: true,
  },
] as Array<IScreen>;

export default Screens;
