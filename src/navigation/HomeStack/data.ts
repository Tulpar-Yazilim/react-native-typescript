import {HomePage, DetailPage} from '@screens';
import Routes from '../Routes';
const pages = [
  {
    name: Routes.HOME_SCREEN,
    component: HomePage,
    headerShown: false,
  },
  {
    name: Routes.HOME_DETAIL_SCREEN,
    component: DetailPage,
    headerShown: false,
  },
];

export default pages;
