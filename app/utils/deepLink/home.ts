import {rootNavigationRef, Routes} from '@/navigation';
import {FetchDataPage, FormPage, HomePage} from '@/screens';

import {DeeplinkConfigType} from '../infrastructure/types';

const homePageDeepLinkRoutes: DeeplinkConfigType[] = [
  {
    route: Routes.HOME_SCREEN,
    component: HomePage,
  },
  {
    route: Routes.FORM_SCREEN,
    component: FormPage,
  },
  {
    route: Routes.FETCH_DATA_SCREEN,
    component: FetchDataPage,
  },
];

const navigateToHomeScreensFromDeeplink = (url: string, config: DeeplinkConfigType) => {
  switch (config.route) {
    case Routes.HOME_SCREEN:
      setTimeout(() => {
        rootNavigationRef.navigate(Routes.MAIN_TABS_ROOT, {
          screen: Routes.HOME_ROOT,
          params: {
            screen: Routes.HOME_SCREEN,
          },
        } as never);
      }, 500);
      break;
    case Routes.FORM_SCREEN:
      setTimeout(() => {
        const parts = url?.split('/').filter(Boolean);
        rootNavigationRef.navigate(Routes.MAIN_TABS_ROOT, {
          screen: Routes.HOME_ROOT,
          params: {
            screen: Routes.FORM_SCREEN,
            params: {
              detailId: parts?.[parts?.length - 1],
            },
          },
        } as never);
      }, 500);
      break;
    case Routes.FETCH_DATA_SCREEN:
      setTimeout(() => {
        rootNavigationRef.navigate(Routes.MAIN_TABS_ROOT, {
          screen: Routes.FETCH_DATA_SCREEN,
        } as never);
      }, 500);
      break;
    default:
      break;
  }
};

export {homePageDeepLinkRoutes, navigateToHomeScreensFromDeeplink};
