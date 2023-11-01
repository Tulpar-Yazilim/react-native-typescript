import {homePageDeepLinkRoutes, navigateToHomeScreensFromDeeplink} from './home';

const navigateToScreenFromDeeplink = (url?: string | null) => {
  if (!url) {
    return false;
  }
  const route = homePageDeepLinkRoutes.find(item => url.includes(item.route));
  if (!route) {
    return false;
  }
  navigateToHomeScreensFromDeeplink(url, route);
};

export {navigateToScreenFromDeeplink};
