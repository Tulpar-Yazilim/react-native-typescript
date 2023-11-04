import {Linking} from 'react-native';

import {LinkingOptions, PathConfigMap} from '@react-navigation/native';

import {RootStackNavigationProps, Routes} from '@/navigation';
import {navigateToScreenFromDeeplink} from '@/utils';

interface LinkingConfig {
  initialRouteName?: keyof RootStackNavigationProps;
  screens: PathConfigMap<RootStackNavigationProps>;
}

const config: LinkingConfig = {
  screens: {
    [Routes.MAIN_TABS_ROOT]: {
      screens: {
        [Routes.HOME_SCREEN]: {
          path: Routes.HOME_SCREEN,
        },
      },
    },
  },
};

const linking: LinkingOptions<RootStackNavigationProps> = {
  prefixes: ['boilerplate://', 'https://boilerplate.com'],
  config,
  subscribe(listener) {
    // When app is opened
    const linkingSubscription = Linking.addEventListener('url', ({url}) => {
      navigateToScreenFromDeeplink(url);
      listener(url);
    });

    return () => {
      linkingSubscription.remove();
    };
  },
  async getInitialURL() {
    // When app is closed
    const url = await Linking.getInitialURL();
    navigateToScreenFromDeeplink(url);
    return url;
  },
};

export default linking;
